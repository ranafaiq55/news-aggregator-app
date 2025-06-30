import React, { useState, useMemo } from 'react';
import { useArticles } from '../hooks/useArticles';
import { type ArticleFilters } from '../api/types';
import ArticleList from '../components/ArticleList';
import Spinner from '../components/Spinner';
import SkeletonCard from '../components/SkeletonCard';
import ErrorBoundary from '../components/ErrorBoundary';

const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
const sources = ['NewsAPI', 'Guardian', 'NYT'];

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<ArticleFilters>({ query: 'technology' });
  const { articles, loading, error } = useArticles({ ...filters });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSourceToggle = (source: string) => {
    setFilters((prev) => {
      const current = new Set(prev.sources ?? sources);
      current.has(source) ? current.delete(source) : current.add(source);
      return { ...prev, sources: Array.from(current) };
    });
  };

  const handleCategorySelect = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: prev.category === cat ? '' : cat }));
  };

  const authors = useMemo(() => {
    const names = new Set(
      articles
        .map((a) => a.author?.trim())
        .filter((a): a is string => Boolean(a))
    );
    return [...names].sort();
  }, [articles]);

  const handleAuthorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, author: value === '' ? undefined : value }));
  };

  const availableSources = useMemo(() => {
    const set = new Set(articles.map(a => a.source));
    return [...set];
  }, [articles]);

  return (
    <ErrorBoundary>
      <main className="p-4 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">News Aggregator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="query"
            placeholder="Search keyword"
            value={filters.query || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <input
            type="date"
            name="fromDate"
            value={filters.fromDate || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="toDate"
            value={filters.toDate || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <select
            name="author"
            value={filters.author || ''}
            onChange={handleAuthorSelect}
            className="p-2 border rounded"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1 rounded border text-sm ${filters.category === cat ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => handleSourceToggle(src)}
              className={`px-3 py-1 rounded border text-sm ${filters.sources?.includes(src) ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
            >
              {src} {availableSources.includes(src) ? '✅' : ''}
            </button>
          ))}
        </div>

        {error && <p className="text-yellow-600">Some sources failed to load. Showing partial results.</p>}

        {loading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && <ArticleList articles={articles} />}
        {loading && <Spinner />}
      </main>
    </ErrorBoundary>
  );
};

export default HomePage;
