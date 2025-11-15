import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-700 dark:text-slate-300">Pilih Kategori</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category)}
            className="group relative rounded-xl flex flex-col items-center justify-center p-6 text-slate-800 dark:text-slate-200 font-bold text-lg text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <category.icon className={`h-12 w-12 mb-3 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 ${category.color}`} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <div className="text-center mt-12">
        <a
          href="https://lynk.id/yustdan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          Info Kreator
        </a>
      </div>
    </div>
  );
};

export default CategorySelector;