// /lib/metadata.ts
import { Metadata } from "next";


// Default metadata values (merged with layout.tsx)
const defaultMetadata = {
  description: "Explore our comprehensive database index at CryoRepository.",
  imageUrl: "/assets/ogp.png", // Consistent with seo.ts
  baseUrl: "https://www.cryorepository.com",
  icons: {
    icon: [{ url: "/assets/favicon.png", type: "image/png" }],
  },
  manifest: '/manifest/manifest.json',
  keywords:
    "Cryopreservation, Cryorepository, Cryo Repository, Cryoprotectants, Preservation, Cryobiology, Cryogenic Storage, Cold Storage, Biopreservation, Cryopreservation Research, CryoDAO",
};

// Helper function to create metadata
function createMetadata({
  title,
  description = defaultMetadata.description,
  canonical = defaultMetadata.baseUrl,
  imageUrl = defaultMetadata.imageUrl,
  keywords = defaultMetadata.keywords,
  siteName = "CryoRepository",
}: {
  title: string;
  description?: string;
  canonical?: string;
  imageUrl?: string;
  keywords?: string;
  siteName?: string;
}): Metadata {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    title: `${title} | CryoRepository`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      siteName,
      title: `${title} | CryoRepository`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CryoRepository preview image",
        },
      ],
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CryoRepository`,
      description,
      images: [imageUrl],
    },
    keywords,
    icons: defaultMetadata.icons,
  };
};

// Static metadata for Home and Not Found pages (identical)
export const homeMetadata: Metadata = createMetadata({
  title: "CryoRepository - Discover Cryopreservation CryoRepo",
  description: "Your source of information on cryoprotective agents.",
  canonical: "/",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Not Found page
export const notFoundMetadata: Metadata = createMetadata({
  title: "Page Not Found (404)",
  description: "Your source of information on cryoprotective agents.",
  canonical: "/",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Search page
export const searchMetadata: Metadata = createMetadata({
  title: "Search Our Database",
  description: "Your source of information on cryoprotective agents.",
  canonical: "/search",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Database Index page
export const databaseIndexMetadata: Metadata = createMetadata({
  title: "CPA Database",
  canonical: "/database",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Reference Index page
export const referenceIndexMetadata: Metadata = createMetadata({
  title: "Reference Index",
  canonical: "/database",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Filters page
export const filtersMetadata: Metadata = createMetadata({
  title: "Filter Entries",
  canonical: "/filter",
  imageUrl: "/assets/ogp.png",
});

// Static metadata for Contact page
export const contactMetadata: Metadata = createMetadata({
  title: "Contact Us",
  canonical: "/contact",
  imageUrl: "/assets/ogp.png",
});

// Dynamic metadata for Search Results page
export async function searchResultsMetadata({
  decodedToken,
  route
}: {
  decodedToken: string;
  route: string;
}): Promise<Metadata> {
  return createMetadata({
    title: `${decodedToken} - Search Results`,
    description: `${decodedToken} | Search Results CryoRepository`,
    canonical: `/search/${route}`,
    imageUrl: "/assets/ogp.png",
  });
};

// Dynamic metadata for Article Result page
export async function articleResultMetadata({
  entryName,
  hash,
  overview,
  image,
}: {
  entryName: string; 
  hash: string;
  overview?: string;
  image?: string;
}): Promise<Metadata> {
  return createMetadata({
    title: entryName,
    description: overview || `Learn about ${entryName} at CryoRepository`,
    canonical: `/database/${hash}`,
    imageUrl:
      image ||
      "/assets/ogp.png",
  });
};