import { NextRequest, NextResponse } from "next/server";
import MainDB from "@/lib/schemas/schema";

// Define TypeScript interfaces
interface Entry {
  hash: string;
  name: string;
  // Add other fields as needed
}

interface FetchArticleResponse {
  entry?: Entry;
  error?: string;
}

// Sanitize hash to allow only alphanumeric characters
function sanitizeHash(hash: string): string | null {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(hash) ? hash : null;
}

// GET /article/:hash
export async function GET(req: NextRequest, { params }: { params: { hash: string } }) {
  try {
    const routeParams = await params
    const { hash } = routeParams;

    if (!hash) {
      console.error("Hash is undefined");
      return NextResponse.json({ error: "Hash is undefined" } as FetchArticleResponse, { status: 400 });
    }

    const sanitizedHash = sanitizeHash(hash);
    if (!sanitizedHash) {
      console.error("Invalid hash");
      return NextResponse.json({ error: "Invalid hash" } as FetchArticleResponse, { status: 400 });
    }

    // Fetch entry from database
    const entry = await MainDB.findOne({ hash: sanitizedHash }).lean();

    if (!entry) {
      return NextResponse.json({ error: "No entry found with the provided hash" } as FetchArticleResponse, { status: 404 });
    }

    return NextResponse.json({ entry } as FetchArticleResponse, { status: 200 });
  } catch (error) {
    console.error("Error occurred while fetching entry:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." } as FetchArticleResponse,
      { status: 500 }
    );
  }
}