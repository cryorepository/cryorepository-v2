// lib/search_db.ts
import MainDB from './schema';
import { Document } from 'mongoose';

type MainDBDocument = Document & {
  name?: string;
  overview?: string;
  hash: string;
  structure_image?: string;
  cas_number?: string;
  class?: string;
  chemical_formula?: string;
  molecular_formula?: string;
  molecular_weight?: string;
  optimal_conc?: string;
  tags?: string;
  synonyms?: string[];
  written_by?: string[];
  references?: Array<{ reference?: string; url?: string }>;
};

async function searchDB(search_term: string, closest_match: string): Promise<MainDBDocument[]> {
  try {
    // Sanitize search term for text search
    const sanitizedTerm = search_term.replace(/[^\w\s]/gi, '').trim();
    const projection = {
      name: 1,
      overview: 1,
      hash: 1,
      structure_image: 1,
      _id: 0,
      score: { $meta: 'textScore' } as const, // Explicitly type $meta
    };

    // Text search pipeline (only if sanitizedTerm exists)
    const textSearchPipeline = sanitizedTerm
      ? [
          {
            $match: {
              $text: { $search: sanitizedTerm },
            },
          },
          {
            $sort: {
              score: { $meta: 'textScore' } as { $meta: 'textScore' }, // Explicitly type $meta
            },
          },
        ]
      : [];

    // Exact matches for specific fields
    const exactFields = [
      { cas_number: search_term },
      { hash: search_term },
      { class: search_term },
      { chemical_formula: search_term },
      { molecular_formula: search_term },
      { molecular_weight: search_term },
      { optimal_conc: search_term },
    ];

    // Combine text search and exact matches
    let results = await MainDB.aggregate<MainDBDocument>([
      {
        $facet: {
          textResults: [
            ...textSearchPipeline,
            {
              $project: projection,
            },
            {
              $limit: 30,
            },
          ],
          exactResults: [
            {
              $match: {
                $or: exactFields,
              },
            },
            {
              $project: {
                ...projection,
                score: { $literal: 0 }, // Exact matches have lower priority
              },
            },
            {
              $limit: 30,
            },
          ],
        },
      },
      {
        $project: {
          combined: { $concatArrays: ['$textResults', '$exactResults'] },
        },
      },
      {
        $unwind: '$combined',
      },
      {
        $replaceRoot: { newRoot: '$combined' },
      },
      {
        $group: {
          _id: '$hash', // Deduplicate by hash
          doc: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$doc' },
      },
      {
        $sort: { score: -1 }, // Sort by score (text matches first)
      },
      {
        $limit: 30,
      },
    ]).exec(); // Explicitly call exec() for clarity

    // Fallback to closest_match if no results
    if (results.length === 0 && closest_match) {
      const sanitizedClosest = closest_match.replace(/[^\w\s]/gi, '').trim();
      results = await MainDB.aggregate<MainDBDocument>([
        {
          $match: {
            $text: { $search: sanitizedClosest },
          },
        },
        {
          $sort: {
            score: { $meta: 'textScore' } as { $meta: 'textScore' }, // Explicitly type $meta
          },
        },
        {
          $project: projection,
        },
        {
          $limit: 30,
        },
      ]).exec();
    }

    return results;
  } catch (err) {
    console.error('An error occurred in searchDB:', err);
    return [];
  }
}

export default searchDB;