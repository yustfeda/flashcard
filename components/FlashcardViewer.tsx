import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlashcardData, Category } from '../types';
import Flashcard from './Flashcard';
import { BackIcon, NextIcon, PrevIcon, ShuffleIcon } from './Icons';

interface FlashcardViewerProps {
  cards: FlashcardData[];
  category: Category;
  onBack: () => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ cards, category, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([...cards]);
  const [isShuffling, setIsShuffling] = useState(false);

  const currentCard = useMemo(() => shuffledCards[currentIndex], [shuffledCards, currentIndex]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
    }, 150);
  }, [shuffledCards.length]);

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledCards.length) % shuffledCards.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setIsFlipped(false);
    setTimeout(() => {
        const newShuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setShuffledCards(newShuffledCards);
        setCurrentIndex(0);
        setIsShuffling(false);
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsFlipped((f) => !f);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  const progressPercentage = ((currentIndex + 1) / shuffledCards.length) * 100;

  return (
    <div className="flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
             <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-all transform hover:scale-105">
                <BackIcon className="w-5 h-5" />
                <span>Kategori</span>
            </button>
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-200">{category.name}</h2>
            <button onClick={handleShuffle} aria-label="Shuffle cards" className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-all transform hover:scale-105">
                <ShuffleIcon className={`w-6 h-6 transition-transform duration-500 ${isShuffling ? 'rotate-180' : ''}`} />
            </button>
        </div>

      <div className="w-full max-w-lg perspective-1000">
        <Flashcard
          data={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
        />
      </div>

      <div className="w-full max-w-lg mt-6">
        <div className="flex justify-between items-center text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
            <span>Progress</span>
            <span>{currentIndex + 1} / {shuffledCards.length}</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-100"
        >
          <PrevIcon className="w-8 h-8" />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-10 py-5 text-xl font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-100"
        >
          Balik Kartu
        </button>
        <button
          onClick={handleNext}
          aria-label="Next card"
          className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-100"
        >
          <NextIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardViewer;