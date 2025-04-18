// app/api/search/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Extract query parameter
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")?.trim() || ""

    // Validate query
    if (query.length <= 1) {
      return NextResponse.json({ results: [] }, { status: 200 })
    }

    // Mock search logic: Generate 5 results based on the query
    const results = Array.from({ length: 5 }, (_, i) => `${query} Result ${i + 1}`)

    // Return results
    return NextResponse.json({ results }, { status: 200 })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}