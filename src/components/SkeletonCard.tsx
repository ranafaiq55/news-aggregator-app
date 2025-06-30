import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonCard;