import React, { useState, useCallback, useEffect } from 'react';
import { Category, FlashcardData } from './types';
import { CATEGORIES } from './constants';
import { generateFlashcards } from './services/geminiService';
import CategorySelector from './components/CategorySelector';
import FlashcardViewer from './components/FlashcardViewer';
import LoadingSpinner from './components/LoadingSpinner';
import { MoonIcon, SunIcon } from './components/Icons';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSelectCategory = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    setError(null);
    try {
      const cards = await generateFlashcards(category.name);
      setFlashcards(cards);
    } catch (err) {
      setError('Gagal memuat kartu. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setFlashcards([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100">
            English Flashcards
          </h1>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            {isDarkMode ? <SunIcon className="w-7 h-7"/> : <MoonIcon className="w-7 h-7" />}
          </button>
        </header>

        <main>
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && (
            <div className="text-center p-8 bg-red-100 dark:bg-red-900/20 border-2 border-red-400 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
              <button
                onClick={() => handleSelectCategory(selectedCategory!)}
                className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105 shadow-md"
              >
                Coba Lagi
              </button>
            </div>
          )}
          {!selectedCategory && !isLoading && !error && (
            <CategorySelector categories={CATEGORIES} onSelectCategory={handleSelectCategory} />
          )}
          {selectedCategory && !isLoading && !error && flashcards.length > 0 && (
            <FlashcardViewer 
              cards={flashcards} 
              category={selectedCategory}
              onBack={handleBackToCategories} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;