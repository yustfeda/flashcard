import React, { useCallback } from 'react';
import { FlashcardData } from '../types';
import { SoundIcon } from './Icons';

interface FlashcardProps {
  data: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, isFlipped, onFlip }) => {

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window && data.english) {
      const utterance = new SpeechSynthesisUtterance(data.english);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  }, [data.english]);

  // Use a hash of the image prompt to get a consistent "random" image from picsum
  const imageId = data.image_prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;

  return (
    <div className={`card w-full aspect-[4/3] cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      {/* Front of the card */}
      <div className="card-face absolute w-full h-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center">
        <p className="text-slate-500 dark:text-slate-400 text-xl">Bahasa Indonesia</p>
        <h3 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 mt-2">{data.indonesian}</h3>
        <p className="absolute bottom-4 text-sm text-slate-400">Klik untuk melihat jawaban</p>
      </div>

      {/* Back of the card */}
      <div className="card-back card-face absolute w-full h-full p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex flex-col justify-between items-center text-center">
        <div className="w-full flex justify-between items-start">
            <span className="text-slate-500 dark:text-slate-400 text-xl">English</span>
            <button onClick={handleSpeak} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <SoundIcon className="w-7 h-7 text-blue-500"/>
            </button>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-lg overflow-hidden shadow-inner">
                <img 
                    src={`https://picsum.photos/id/${imageId}/200/200`}
                    alt={data.image_prompt} 
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-5xl md:text-6xl font-black text-blue-600 dark:text-blue-400">{data.english}</h3>
        </div>
        <p className="text-sm text-slate-400">Klik untuk membalik kartu</p>
      </div>
    </div>
  );
};

export default Flashcard;