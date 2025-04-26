// /app/filters/[filters]/page.tsx
import { Metadata } from "next"
import FilterPopup from "@/components/databasePage/filterComponent/filter-page-popup"
import { notFound } from "next/navigation"
import { FilterBreadcrumb } from "@/components/databasePage/filterComponent/filters/filter-breadcrumb"
import Link from "next/link"

// Define interfaces for data structures
interface FilterParams {
  selectedClasses?: string[];
  GRAS?: string;
  cellType?: string;
  weightRangeMin?: string;
  weightRangeMax?: string;
  successRateMin?: string;
  successRateMax?: string;
  [key: string]: string | string[] | undefined;
}

interface SearchResult {
  hash: string;
  name: string;
  class?: string;
  overview: string;
  structure_image?: string;
  molecular_weight?: string;
  sorted_cell_info?: { cellType: string; successRate: string }[];
}

interface ApiResponse {
  classes: string[];
  uniqueCellTypes: string[];
  results: SearchResult[];
}

// Interface for page props
interface FilterPageProps {
  params: {
    filters: string; // The dynamic route segment containing query string
  };
}

// Function to parse URL parameters
const getFiltersFromParams = (params: { filters: string }): FilterParams => {
  const decodedParams = decodeURIComponent(params.filters);
  const filters: FilterParams = {};

  decodedParams.split("&").forEach((param) => {
    const [key, value] = param.split("=");

    if (value) {
      const processedValue = value.replace(/\+/g, " ").trim();

      if (processedValue) {
        if (processedValue.includes(",")) {
          const filteredArray = processedValue
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v);
          if (filteredArray.length > 0) filters[key] = filteredArray;
        } else {
          filters[key] = processedValue;
        }
      }
    }
  });

  // console.log("Parsed Filters:");
  // console.log(JSON.stringify(filters, null, 2));

  return filters;
};

// Metadata (same as provided)
export const metadata: Metadata = {
  title: "Filter Data | CryoRepository",
  description: "Explore our comprehensive database index at CryoRepository.",
  alternates: {
    canonical: "https://www.cryorepository.com/database",
  },
  openGraph: {
    title: "Filter Data | CryoRepository",
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
    title: "Filter Data | CryoRepository",
    description: "Explore our comprehensive database index at CryoRepository.",
    images: [
      "https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938",
    ],
  },
};

export default async function FilterPage({ params }: FilterPageProps) {
  const pageParams = await params;
  const filters = getFiltersFromParams(pageParams);

  // Fetch data from API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filters,
    }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  const data: ApiResponse = await response.json();
  const searchResults = data.results;

  if (!response.ok) notFound();

  // Map filters to FilterPopup params format
  const filterPopupParams = {
    selectedClasses: filters.selectedClasses || [],
    foundOnGRASList:
      filters.GRAS !== undefined ? filters.GRAS === "true" : undefined,
    cellType: filters.cellType || "",
    molecularWeightMin: filters.weightRangeMin || "",
    molecularWeightMax: filters.weightRangeMax || "",
    successRateMin: filters.successRateMin || "",
    successRateMax: filters.successRateMax || "",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <FilterBreadcrumb />

      <FilterPopup
        chemClassFilters={data.classes}
        cellTypeFilters={data.uniqueCellTypes}
        params={filterPopupParams}
      />

      <div className="searchResults mt-6">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Link
              key={index}
              href={`/database/${result.hash}`}
              className="group flex flex-col sm:flex-row gap-4 py-4"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold group-hover:underline">
                  {result.name}
                  {filters.selectedClasses && result.class && (
                    <span className="text-base font-normal"> - {result.class}</span>
                  )}
                </h2>
                <p className="text-muted-foreground line-clamp-3 leading-[1.3]">
                  {result.overview}
                </p>
                {filters.weightRangeMin &&
                  filters.weightRangeMax &&
                  result.molecular_weight && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Molecular Weight:</h4>
                      <p className="text-sm text-muted-foreground">{result.molecular_weight}</p>
                    </div>
                  )}
                {filters.cellType &&
                  result.sorted_cell_info &&
                  result.sorted_cell_info.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Cell Type Info:</h4>
                      {result.sorted_cell_info.map((info, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {info.cellType} - Success Rate: {info.successRate}%
                        </p>
                      ))}
                    </div>
                  )}
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
          <div className="noResults text-center py-8">
            <h4 className="text-lg font-medium text-muted-foreground">No Results Found</h4>
          </div>
        )}
      </div>
      <style>{`
        footer {
          display: none;
        }
      `}</style>
    </div>
  );
}