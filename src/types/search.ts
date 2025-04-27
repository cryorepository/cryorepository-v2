interface SearchResult {
  hash: string
  name: string
  overview: string
  structure_image?: string
}

export interface SearchResponse {
  response: {
    search_results: SearchResult[]
    dym?: string
    dym_href?: string
  }
}

export interface SearchPageParams {
  query: string
}