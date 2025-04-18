{/*// pages/database/[hash].tsx
import ArticleDetails from './displayData';

interface ArticleEntry {
  name: string;
  hash: string;
  chemClass: string;
  chemical_formula_html: string;
  molecular_formula_html: string;
  molecular_weight: string;
  optimal_conc: string;
  structure_image?: string;
  cas_number: string;
  safety_document_sheet?: string;
  html_text: string;
  pricing_info?: any;
  date_written: string;
  written_by: string[];
  synonyms: string[];
  cell_info: Array<{ cellType: string; successRate?: string; referenceURL?: string }>;
  references: Array<{ reference: string; url: string; organisation: string }>;
  gras_info?: { found: boolean; reference_url?: string };
  overview?: string;
}

interface ArticleData {
  entry: ArticleEntry;
}

interface ArticlePageParams {
  params: { hash: string };
}

async function getArticleData(hash: string): Promise<ArticleData | null> {
  const res = await fetch(`https://api.cryorepository.com/fetch_article`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hash }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: ArticlePageParams) {
  const data = await getArticleData(params.hash);

  if (!data) {
    return {
      title: 'Page Not Found (404) - CryoRepository',
      description: 'Page Not Found (404) - CryoRepository | Your source of information on cryoprotective agents.',
      openGraph: {
        title: 'Page Not Found (404) - CryoRepository',
        description: 'Page Not Found (404) - CryoRepository | Your source of information on cryoprotective agents.',
        images: [
          {
            url: 'https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938',
            width: 500,
            height: 500,
            alt: 'CryoRepository preview image',
          },
        ],
        url: 'https://cryorepository.com',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Page Not Found (404) - CryoRepository',
        description: 'Page Not Found (404) - CryoRepository | Your source of information on cryoprotective agents.',
        images: [
          'https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938',
        ],
      },
    };
  }

  const { entry } = data;

  return {
    title: `${entry.name} | CryoRepository`,
    description: entry.overview || '',
    alternates: {
      canonical: `https://www.cryorepository.com/database/${entry.hash}`,
    },
    openGraph: {
      siteName: 'CryoRepository',
      title: `${entry.name} | CryoRepository`,
      description: entry.overview || '',
      images: [
        {
          url: entry.structure_image || 'https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938',
          alt: 'CryoRepository preview image',
        },
      ],
      url: `https://cryorepository.com/database/${entry.hash}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.name,
      description: entry.overview || '',
      images: [
        entry.structure_image || 'https://cdn.glitch.global/21a2d050-b3c7-4611-8e67-c6f3ae33f0df/favicon.png?v=1720056814938',
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageParams) {
  const data = await getArticleData(params.hash);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] w-full">
        <div className="w-[300px] mx-15 p-7 border border-gray-700 rounded">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2">Page Not Found</p>
        </div>
        <style jsx>{`
          footer {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  const { entry } = data;

  const props: ArticleEntry = {
    name: entry.name,
    hash: entry.hash,
    chemClass: entry.class,
    chemicalFormulaHtml: entry.chemical_formula_html,
    molecularFormulaHtml: entry.molecular_formula_html,
    molecularWeight: entry.molecular_weight,
    optimalConc: entry.optimal_conc,
    structureImage: entry.structure_image,
    casNumber: entry.cas_number,
    safetyDocumentSheet: entry.safety_document_sheet,
    htmlText: entry.html_text,
    pricingInfo: entry.pricing_info,
    date_written: entry.date_written,
    written_by: entry.written_by,
    synonyms: entry.synonyms,
    cell_info: entry.cell_info,
    references: entry.references,
    gras_info: entry.gras_info,
  };

  return <ArticleDetails {...props} />;
}*/}