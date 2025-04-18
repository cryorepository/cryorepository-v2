// lib/autocomplete.ts
import { JaroWinklerDistance } from 'natural';
import MainDB from './schema';
import { Document } from 'mongoose';

interface AutoCompleteResult {
  closest_match: string;
  autocomplete: string;
}

// Infer the document type from MainDB
type MainDBDocument = Document & {
  name?: string;
  synonyms?: string[];
};

async function fetchSearchTerms(): Promise<string[]> {
  try {
    const results = await MainDB.find({}, { name: 1, synonyms: 1, _id: 0 }).lean();
    const terms: string[] = [];

    results.forEach((doc: MainDBDocument) => {
      if (doc.name) terms.push(doc.name);
      if (doc.synonyms && Array.isArray(doc.synonyms)) {
        terms.push(...doc.synonyms.filter(synonym => synonym && synonym.trim()));
      }
    });

    return [...new Set(terms)]; // Remove duplicates
  } catch (err) {
    console.error('Error fetching search terms:', err);
    return [];
  }
}

async function autoComplete(input: string): Promise<AutoCompleteResult> {
  const searchTerms = await fetchSearchTerms();
  const inputLower = input.toLowerCase();
  let closestMatch = input;
  let highestSimilarity = 0;

  searchTerms.forEach(term => {
    const termLower = term.toLowerCase();
    const similarity = JaroWinklerDistance(termLower, inputLower); // Removed caseSensitive option
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      closestMatch = term; // Preserve original case for response
    }
  });

  const autocomplete = highestSimilarity > 0.8 && closestMatch.toLowerCase() !== inputLower ? closestMatch : '';

  return {
    closest_match: closestMatch,
    autocomplete,
  };
}

export default autoComplete;