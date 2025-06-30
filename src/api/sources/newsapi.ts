import axios from 'axios';
import { type Article,type ArticleFilters } from '../types';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchFromNewsAPI = async (filters: ArticleFilters): Promise<Article[]> => {
  const { query = '', fromDate, toDate, category } = filters;
  const searchTerm = category ? `${query} ${category}`.trim() : query;
  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=${NEWS_API_KEY}`;
  if (fromDate) url += `&from=${fromDate}`;
  if (toDate) url += `&to=${toDate}`;

  const res = await axios.get(url);
  return res.data.articles.map((a: any) => ({
    title: a.title,
    summary: a.description,
    source: a.source.name,
    author: a.author,
    publishedAt: a.publishedAt,
    url: a.url,
    category,
  }));
};