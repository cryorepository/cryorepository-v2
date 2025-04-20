// lib/search_db.ts
import MainDB from '@/lib/schemas/schema';
import { Document } from 'mongoose';

// Infer the document type from MainDB
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
    const regex = new RegExp(search_term, 'i');
    const projection = { name: 1, overview: 1, hash: 1, structure_image: 1, _id: 0 };

    const regexFields = [
      { name: regex },
      { overview: regex },
      { tags: regex },
      { synonyms: { $elemMatch: { $regex: regex } } },
      { written_by: regex },
      { 'references.reference': { $regex: regex } },
      { 'references.url': { $regex: regex } },
    ];
    const exactFields = [
      { cas_number: search_term },
      { hash: search_term },
      { class: search_term },
      { chemical_formula: search_term },
      { molecular_formula: search_term },
      { molecular_weight: search_term },
      { optimal_conc: search_term },
    ];

    let results = await MainDB.aggregate<MainDBDocument>([
      {
        $match: {
          $or: [...regexFields, ...exactFields],
        },
      },
      {
        $group: {
          _id: '$hash',
          doc: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$doc' },
      },
      {
        $project: projection,
      },
      {
        $limit: 30,
      },
    ]);

    if (results.length === 0 && closest_match) {
      const closestMatchRegex = new RegExp(closest_match, 'i');

      results = await MainDB.aggregate<MainDBDocument>([
        {
          $match: {
            $or: regexFields.map(field => ({ [Object.keys(field)[0]]: closestMatchRegex })),
          },
        },
        {
          $group: {
            _id: '$hash',
            doc: { $first: '$$ROOT' },
          },
        },
        {
          $replaceRoot: { newRoot: '$doc' },
        },
        {
          $project: projection,
        },
        {
          $limit: 30,
        },
      ]);
    }

    return results;
  } catch (err) {
    console.error('An error occurred in searchDB:', err);
    return [];
  }
}

export default searchDB;