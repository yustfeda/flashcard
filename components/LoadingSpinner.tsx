import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">Mempersiapkan set kartu Anda...</p>
    </div>
  );
};

export default LoadingSpinner;