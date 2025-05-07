// app/api/search/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import searchDB from './search-db';

interface SearchRequestBody {
  search_query?: string;
}

interface SearchResultItem {
  name: string;
  hash: string;
}

interface SearchResponse {
  message: string;
  results: SearchResultItem[];
}

export async function POST(req: NextRequest) {
  try {
    const body: SearchRequestBody = await req.json();
    const { search_query } = body;

    if (!search_query) {
      return NextResponse.json({ error: 'Query is undefined' }, { status: 400 });
    }

    let decodedQuery: string;
    try {
      decodedQuery = decodeURIComponent(search_query);
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: 'Invalid query encoding.' }, { status: 400 });
    }

    const sanitizedQuery = decodedQuery.replace(/[^\w\s]/gi, '').trim();

    if (sanitizedQuery.length <= 2) {
      return NextResponse.json(
        { error: 'Query is too short. Please enter more than 2 characters.' },
        { status: 400 }
      );
    }

    const searchResults = await searchDB(sanitizedQuery);

    const response: SearchResponse = {
      message: 'Success',
      results: searchResults
        .filter(result => result.name && result.hash) // Make sure both exist, if needed
        .map(result => ({
        name: result.name!,
        hash: result.hash!,
        })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error occurred in search API [500]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}