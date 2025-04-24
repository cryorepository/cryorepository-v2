import Link from "next/link"
import PaginationComponent from "@/components/searchComponents/databasePage/pagination-component"
import { DatabaseBreadcrumb } from "@/components/searchComponents/databasePage/database-breadcrumb"

// Define TypeScript interfaces
interface Entry {
  hash: string;
  name: string;
  overview: string;
  structure_image?: string;
}

interface IndexResponse {
  filter: string[];
  uniqueCellTypes: string[];
  entries: Entry[];
  total: number;
  page: number;
  totalPages: number;
}

// Metadata
export const metadata = {
  title: "Database Index | CryoRepository",
  description: "Explore our comprehensive database index at CryoRepository.",
  alternates: {
    canonical: "https://www.cryorepository.com/database",
  },
  openGraph: {
    siteName: "CryoRepository",
    title: "Database Index | CryoRepository",
    description: "Explore our comprehensive database index at CryoRepository.",
    images: [
      {
        url: "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938",
        width: 500,
        height: 500,
        alt: "CryoRepository preview image",
      },
    ],
    url: "https://www.cryorepository.com/database",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Database Index | CryoRepository",
    description: "Explore our comprehensive database index at CryoRepository.",
    images: [
      "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938",
    ],
  },
};

export default async function IndexPage({ searchParams }: { searchParams: { page?: string; limit?: string } }) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);

  // Validate pagination parameters
  if (page < 1 || limit < 1) {
    return <div className="container text-red-600">Invalid page or limit</div>;
  }

  // Fetch data server-side
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/article/index?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure dynamic SSR
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: IndexResponse = await response.json();

    return (
      <div className="pt-4 mx-auto px-4 py-8 max-w-6xl">
        <DatabaseBreadcrumb />

        <div className="searchResults">
          {data.entries.length > 0 ? (
            data.entries.map((result, index) => (
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
                      className="w-full h-auto max-h-[100px] object-cover rounded-lg border border-input dark:border-none dark:bg-white"
                      alt="Structural Diagram"
                      src={result.structure_image}
                    />
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="noResults">
              <h4>No Results Found</h4>
            </div>
          )}
        </div>

        <PaginationComponent
          initialData={data}
          page={page}
          limit={limit}
        />

        <style>{`
        footer{
          display: none;
        }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div className="container text-red-600">An error occurred while loading the database.</div>;
  }
}