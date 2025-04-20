// app/search/[query]/page.tsx
import { Metadata } from "next"
import { notFound } from 'next/navigation'
import Link from "next/link"
import { SearchBreadcrumb } from "@/components/searchComponents/searchPage/search-breadcrumb"

// Define interfaces for API response and params
interface SearchResult {
  hash: string
  name: string
  overview: string
  structure_image?: string
}

interface SearchResponse {
  response: {
    search_results: SearchResult[]
    dym?: string
    dym_href?: string
  }
}

interface SearchPageParams {
  query: string
}

// Utility function to extract search term
const decodeParams = (query: string): string => {
  const decodedToken = decodeURIComponent(query)
  return decodedToken.replace(/^query=/, "")
}

// Generate metadata for SEO
export const generateMetadata = async ({
  params,
}: {
  params: SearchPageParams
}): Promise<Metadata> => {
  const { query } = await params;
  const fullParam = await params;
  const decodedToken = decodeParams(query);

  return {
    title: `${decodedToken} | Search Results CryoRepository`,
    description: `${decodedToken} | Search Results CryoRepository`,
    alternates: {
      canonical: "https://www.cryorepository.com/search",
    },
    openGraph: {
      siteName: "CryoRepository",
      title: `${decodedToken} | Search Results CryoRepository`,
      description: `${decodedToken} | Search Results CryoRepository`,
      images: [
        {
          url: "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938",
          alt: "CryoRepository preview image",
        },
      ],
      url: `https://cryorepository.com/search/${fullParam}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedToken} | Search Results CryoRepository`,
      description: `${decodedToken} | Search Results CryoRepository`,
      images: [
        "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938",
      ],
    },
  }
}

export default async function SearchPage({ params }: { params: SearchPageParams }) {
  const { query } = await params;
  const searchTerm = decodeParams(query);

  // Fetch search results
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //const response = await fetch(`${BASE_URL}/api/search`, {
    const response = await fetch(`${BASE_URL}/api/search`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search_query: searchTerm }),
    next: { revalidate: 3600 }, // Revalidate every hour
  })


  if (!response.ok) {
    notFound()
  }

  const data: SearchResponse = await response.json()
  const searchResults = data.response.search_results || []

  const { dym, dym_href } = data.response
  const href_value = `query=${dym_href || ""}`

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <SearchBreadcrumb searchTerm={searchTerm} />

        {/* Did You Mean */}
        {dym && dym_href && (
          <div className="mt-2">
            <p className="text-muted-foreground text-sm">
              Did you mean{" "}
              <Link href={href_value} className="text-purple-600 dark:text-purple-500 hover:underline">
                {dym}
              </Link>
              ?
            </p>
          </div>
        )}
      </div>

      {/* Search Results */}
      <section className="space-y-4">
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <Link
                key={index}
                href={`/database/${result.hash}`}
                className="group flex flex-col sm:flex-row gap-4 py-4"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold group-hover:underline">{result.name}</h2>
                  <p className="text-muted-foreground line-clamp-3 leading-[1.3]">{result.overview}</p>
                </div>
                {result.structure_image && (
                  <div className="w-full sm:w-40 flex-shrink-0">
                    <img
                      className="w-full h-auto rounded-lg border border-input dark:border-none dark:bg-white"
                      alt="Structural Diagram"
                      src={result.structure_image}
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h4 className="text-2xl font-semibold text-white">No Results Found</h4>
          </div>
        )}
      </section>
      <style>{`
      footer{
        display: none;
      }
      `}</style>
    </div>
  )
}