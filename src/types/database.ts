interface Entry {
  hash: string;
  name: string;
  overview: string;
  structure_image?: string;
}

export interface IndexResponse {
  chemClassFilters: string[];
  cellTypeFilters: string[];
  entries: Entry[];
  total: number;
  page: number;
  totalPages: number;
}