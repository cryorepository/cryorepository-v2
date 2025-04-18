// lib/autocomplete.ts
import { JaroWinklerDistance } from 'natural';
import MainDB from './schema';
import { Document } from 'mongoose';

interface AutoCompleteResult {
  closest_match: string;
  autocomplete: string;
}

type MainDBDocument = Document & {
  name?: string;
  synonyms?: string[];
};

// In-memory cache for search terms
let cachedTerms: string[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchSearchTerms(): Promise<string[]> {
  // Check cache
  if (cachedTerms && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedTerms;
  }

  try {
    const results = await MainDB.find({}, { name: 1, synonyms: 1, _id: 0 }).lean();
    const terms: { term: string; isName: boolean }[] = [];

    results.forEach((doc: MainDBDocument) => {
      if (doc.name) terms.push({ term: doc.name, isName: true });
      if (doc.synonyms && Array.isArray(doc.synonyms)) {
        terms.push(...doc.synonyms.filter(synonym => synonym && synonym.trim()).map(synonym => ({ term: synonym, isName: false })));
      }
    });

    // Deduplicate and store in cache
    cachedTerms = [...new Set(terms.map(t => t.term))];
    cacheTimestamp = Date.now();
    return cachedTerms;
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
    let similarity = JaroWinklerDistance(termLower, inputLower);
    // Boost similarity for name matches (assuming name is more relevant)
    if (termLower === inputLower) {
      similarity += 0.1; // Exact match boost
    }
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      closestMatch = term;
    }
  });

  const autocomplete = highestSimilarity > 0.8 && closestMatch.toLowerCase() !== inputLower ? closestMatch : '';

  return {
    closest_match: closestMatch,
    autocomplete,
  };
}

export default autoComplete;