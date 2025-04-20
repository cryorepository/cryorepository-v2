// lib/search_db.ts
import MainDB from '@/lib/schemas/schema';
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

async function searchDB(search_term: string): Promise<MainDBDocument[]> {
  try {
    const regex = new RegExp(search_term, 'i');
    const projection = { name: 1, overview: 1, hash: 1, structure_image: 1, _id: 0 };

    const searchFields = [
      { name: regex },
      { overview: regex },
      { tags: regex },
      { synonyms: { $elemMatch: { $regex: regex } } },
      { written_by: regex },
      { 'references.reference': { $regex: regex } },
      { 'references.url': { $regex: regex } },
      { cas_number: search_term },
      { hash: search_term },
      { class: search_term },
      { chemical_formula: search_term },
      { molecular_formula: search_term },
      { molecular_weight: search_term },
      { optimal_conc: search_term },
    ];

    const results = await MainDB.aggregate<MainDBDocument>([
      {
        $match: {
          $or: searchFields,
        },
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
        $project: projection,
      },
      {
        $limit: 30,
      },
    ]).exec();

    return results;
  } catch (err) {
    console.error('An error occurred in searchDB:', err);
    return [];
  }
}

export default searchDB;