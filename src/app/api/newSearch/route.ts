// app/api/search/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import autoComplete from './autocomplete';
import searchDB from './search_db';

interface SearchRequestBody {
  search_query?: string;
}

interface SearchResponse {
  message: string;
  response: {
    dym: string;
    dym_href: string;
    search_results: Array<{
      name?: string;
      overview?: string;
      hash: string;
      structure_image?: string;
    }>;
  };
}

interface ErrorResponse {
  error: string;
}


export async function POST(req: NextRequest) {
  try {

    const body: SearchRequestBody = await req.json();
    const { search_query } = body;

    console.log('Request method:', req.method);

    if (!search_query || typeof search_query !== 'string') {
      return NextResponse.json({ error: 'Query is undefined or invalid' }, { status: 400 });
    }

    // Stricter validation (e.g., prevent SQL injection-like patterns)
    if (/[;<>|&]/.test(search_query)) {
      return NextResponse.json({ error: 'Invalid characters in query' }, { status: 400 });
    }

    let decodedQuery: string;
    try {
      decodedQuery = decodeURIComponent(search_query);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid query encoding' }, { status: 400 });
    }

    const sanitizedQuery = decodedQuery.replace(/[^\w\s]/gi, '').trim();

    if (sanitizedQuery.length <= 2) {
      return NextResponse.json(
        { error: 'Query is too short. Please enter more than 3 characters.' },
        { status: 409 }
      );
    }

    const autoCompleteResult = await autoComplete(sanitizedQuery);
    const { closest_match, autocomplete } = autoCompleteResult;

    const autoCompletedWordEncoded = encodeURIComponent(autocomplete);
    const searchResults = await searchDB(decodedQuery, closest_match);

    const response: SearchResponse = {
      message: 'Success',
      response: {
        dym: autocomplete,
        dym_href: autoCompletedWordEncoded,
        search_results: searchResults,
      },
    };

    // Add caching headers (1 hour)
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error occurred in search API [500]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}