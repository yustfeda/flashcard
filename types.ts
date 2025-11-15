// Fix: Import React to provide types for React.FC and React.SVGProps.
import type * as React from 'react';

export interface FlashcardData {
  english: string;
  indonesian: string;
  image_prompt: string;
}

export interface Category {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}
