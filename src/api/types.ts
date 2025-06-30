export interface Article {
  title: string;
  summary: string;
  source: string;
  author?: string;
  publishedAt?: string;
  url?: string;
  category?: string;
}

export interface ArticleFilters {
  query?: string;
  fromDate?: string;
  toDate?: string;
  sources?: string[];
  category?: string;
  authors?: string[]
}
