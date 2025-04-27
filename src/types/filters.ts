interface SearchResult {
  hash: string;
  name: string;
  class?: string;
  overview: string;
  structure_image?: string;
  molecular_weight?: string;
  sorted_cell_info?: { cellType: string; successRate: string }[];
}

export interface FilterParams {
  selectedClasses?: string[];
  GRAS?: string;
  cellType?: string;
  weightRangeMin?: string;
  weightRangeMax?: string;
  successRateMin?: string;
  successRateMax?: string;
  [key: string]: string | string[] | undefined;
}

export interface ApiResponse {
  classes: string[];
  uniqueCellTypes: string[];
  results: SearchResult[];
}

export interface FilterPageProps {
  filters: string;
}
