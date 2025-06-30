import axios from 'axios';
import { type Article,type ArticleFilters } from '../types';

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchFromNYT = async (filters: ArticleFilters): Promise<Article[]> => {
  const { query = '', fromDate, toDate, category } = filters;
  const searchTerm = category ? `${query} ${category}`.trim() : query;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(searchTerm)}&api-key=${NYT_API_KEY}`;
  if (fromDate) url += `&begin_date=${fromDate.replace(/-/g, '')}`;
  if (toDate) url += `&end_date=${toDate.replace(/-/g, '')}`;

  const res = await axios.get(url);
  return res.data.response.docs.map((a: any) => ({
    title: a.headline.main,
    summary: a.snippet,
    source: 'New York Times',
    author: a.byline?.original,
    publishedAt: a.pub_date,
    url: a.web_url,
    category,
  }));
};
