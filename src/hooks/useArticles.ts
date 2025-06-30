import { useEffect, useState } from 'react';
import { type Article, type ArticleFilters } from '../api/types';
import { getAggregatedArticles } from '../api';

export const useArticles = (filters: ArticleFilters) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getAggregatedArticles(filters);
        setArticles(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(filters)]);

  return { articles, loading, error };
};
