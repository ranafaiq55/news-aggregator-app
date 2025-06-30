import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { type ArticleFilters } from '../api/types';
import ArticleList from '../components/ArticleList';

const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<ArticleFilters>({ query: 'technology' });
  const { articles, loading, error } = useArticles(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSourceToggle = (source: string) => {
    setFilters((prev) => {
      const sources = new Set(prev.sources ?? ['NewsAPI', 'Guardian', 'NYT']);
      sources.has(source) ? sources.delete(source) : sources.add(source);
      return { ...prev, sources: Array.from(sources) };
    });
  };

  return (
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

        <select
          name="category"
          value={filters.category || ''}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

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
      </div>

      <div className="flex gap-2 mb-4">
        {['NewsAPI', 'Guardian', 'NYT'].map((src) => (
          <button
            key={src}
            onClick={() => handleSourceToggle(src)}
            className={`px-3 py-1 rounded border ${filters.sources?.includes(src) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {src}
          </button>
        ))}
      </div>

      {loading && <p>Loading articles...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <ArticleList articles={articles} />
    </main>
  );
};

export default HomePage;