/*import { NextResponse } from 'next/server';
import MainDB from '@/lib/schemas/schema'; // Adjust path as needed

// Interface for reference structure
interface IReference {
  reference: string | null;
  url: string | null;
  organisation: string | null;
  article: { name: string; hash: string }[];
}

// Interface for response structure
interface IReferencesResponse {
  references: IReference[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// GET handler for fetching references with pagination
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get pagination parameters from query
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit: number = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const skip: number = (page - 1) * limit;

    // Fetch entries from the database with pagination
    const entries = await MainDB.find({}, 'name hash references')
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalItems: number = await MainDB.countDocuments();

    // Initialize a map to group references by URL
    const referencesMap = new Map<string, IReference>();

    // Process each entry
    entries.forEach((entry) => {
      if (entry.references && Array.isArray(entry.references) && entry.references.length > 0) {
        entry.references.forEach((ref) => {
          // Check if the reference has non-null values
          const hasNonNullValues = ref.reference || ref.url || ref.organisation;
          if (!hasNonNullValues) return; // Skip entries with all null fields

          const urlKey = ref.url || 'unknown';

          // If the URL key doesn't exist in the map, initialize it
          if (!referencesMap.has(urlKey)) {
            referencesMap.set(urlKey, {
              reference: ref.reference || null,
              url: ref.url || null,
              organisation: ref.organisation || null,
              article: [],
            });
          }

          // Add the current article to the URL's article list
          referencesMap.get(urlKey)!.article.push({
            name: entry.name,
            hash: entry.hash,
          });
        });
      }
    });

    // Convert the map values to an array for the response
    const references: IReference[] = Array.from(referencesMap.values())
      // Filter out any references where all fields are null
      .filter((ref) => ref.reference || ref.url || ref.organisation);

    // Prepare response with pagination metadata
    const response: IReferencesResponse = {
      references,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      totalItems,
    };

    // Send the response
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching references grouped by URL:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching references grouped by URL.' },
      { status: 500 }
    );
  }
}*/

import { NextResponse } from 'next/server';
import MainDB from '@/lib/schemas/schema';

// Interface for reference structure
interface IReference {
  reference: string | null;
  url: string | null;
  organisation: string | null;
  article: { name: string; hash: string }[];
}

// Interface for response structure
interface IReferencesResponse {
  references: IReference[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

// GET handler for fetching references with pagination
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get pagination parameters from query
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit: number = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const skip: number = (page - 1) * limit;

    // Fetch all entries from the database (no pagination here)
    const entries = await MainDB.find({}, 'name hash references').lean();

    // Initialize a map to group references by URL
    const referencesMap = new Map<string, IReference>();

    // Process each entry to group references
    entries.forEach((entry) => {
      if (entry.references && Array.isArray(entry.references) && entry.references.length > 0) {
        entry.references.forEach((ref) => {
          // Check if the reference has non-null values
          const hasNonNullValues = ref.reference || ref.url || ref.organisation;
          if (!hasNonNullValues) return; // Skip entries with all null fields

          // Use URL or reference as key to avoid duplicates (fallback to random for null URL)
          const urlKey = ref.url || ref.reference || `unknown-${Math.random()}`; // Ensure unique key

          // If the URL key doesn't exist in the map, initialize it
          if (!referencesMap.has(urlKey)) {
            referencesMap.set(urlKey, {
              reference: ref.reference || null,
              url: ref.url || null,
              organisation: ref.organisation || null,
              article: [],
            });
          }

          // Add the current article to the URL's article list (avoid duplicate articles)
          const existingArticles = referencesMap.get(urlKey)!.article;
          const articleExists = existingArticles.some((article) => article.hash === entry.hash);
          if (!articleExists) {
            existingArticles.push({
              name: entry.name,
              hash: entry.hash,
            });
          }
        });
      }
    });

    // Convert the map values to an array and filter out invalid references
    const allReferences: IReference[] = Array.from(referencesMap.values()).filter(
      (ref) => ref.reference || ref.url || ref.organisation
    );

    // Apply pagination to the grouped references
    const paginatedReferences = allReferences.slice(skip, skip + limit);

    // Calculate pagination metadata
    const totalItems: number = allReferences.length;
    const totalPages: number = Math.ceil(totalItems / limit);

    // Prepare response with pagination metadata
    const response: IReferencesResponse = {
      references: paginatedReferences,
      totalPages,
      currentPage: page,
      totalItems,
    };

    // Send the response
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching references grouped by URL:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching references grouped by URL.' },
      { status: 500 }
    );
  }
}