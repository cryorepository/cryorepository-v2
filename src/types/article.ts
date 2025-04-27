interface ArticleEntry {
  name: string;
  hash: string;
  class: string;
  chemical_formula_html: string;
  molecular_formula_html: string;
  molecular_weight: string;
  optimal_conc: string;
  structure_image?: string;
  cas_number: string;
  safety_document_sheet?: string;
  html_text: string;
  pricing_info?: string[];
  date_written: string;
  written_by: string[];
  synonyms: string[];
  cell_info: Array<{ cellType: string; successRate?: string; referenceURL?: string }>;
  references: Array<{ reference: string; url: string; organisation: string }>;
  gras_info?: { found: boolean; reference_url?: string };
  overview?: string;
}

export interface ArticleData {
  entry: ArticleEntry;
}

export interface ArticlePageParams {
  hash: string;
}