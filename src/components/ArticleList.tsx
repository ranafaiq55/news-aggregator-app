import React from 'react';
import { type Article } from '../api/types';

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="space-y-4">
      {articles.map((article, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{article.title}</h2>
          <p className="text-sm text-gray-700">{article.summary}</p>
          <div className="text-xs text-gray-500 mt-1">
            <span>Source: {article.source}</span>
            {article.publishedAt && <span> • {new Date(article.publishedAt).toLocaleDateString()}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;