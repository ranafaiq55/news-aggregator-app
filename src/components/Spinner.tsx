import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;