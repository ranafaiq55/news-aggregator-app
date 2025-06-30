import axios from 'axios';
import { type Article,type ArticleFilters } from '../types';
import { GUARDIAN_BASE_URL } from '../../constants';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

export const fetchFromGuardian = async (filters: ArticleFilters): Promise<Article[]> => {
  const { query = '', fromDate, toDate, category } = filters;
  const searchTerm = category ? `${query} ${category}`.trim() : query;
  let url = `${GUARDIAN_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&api-key=${GUARDIAN_API_KEY}&show-fields=trailText,byline,publication`;
  if (fromDate) url += `&from-date=${fromDate}`;
  if (toDate) url += `&to-date=${toDate}`;

  const res = await axios.get(url);
  return res.data.response.results.map((a: any) => ({
    title: a.webTitle,
    summary: a.fields?.trailText || '',
    source: 'The Guardian',
    author: a.fields?.byline,
    publishedAt: a.webPublicationDate,
    url: a.webUrl,
    category,
  }));
};