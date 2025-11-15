
import { Category } from './types';
import { NumberIcon, ColorIcon, AnimalIcon, FoodIcon, FamilyIcon, VerbIcon, AdjectiveIcon, PlaceIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { name: 'Angka', icon: NumberIcon, color: 'text-blue-600 dark:text-blue-400' },
  { name: 'Warna', icon: ColorIcon, color: 'text-purple-600 dark:text-purple-400' },
  { name: 'Hewan', icon: AnimalIcon, color: 'text-green-600 dark:text-green-400' },
  { name: 'Makanan', icon: FoodIcon, color: 'text-orange-600 dark:text-orange-400' },
  { name: 'Keluarga', icon: FamilyIcon, color: 'text-red-600 dark:text-red-400' },
  { name: 'Kata Kerja Umum', icon: VerbIcon, color: 'text-yellow-600 dark:text-yellow-400' },
  { name: 'Kata Sifat', icon: AdjectiveIcon, color: 'text-pink-600 dark:text-pink-400' },
  { name: 'Tempat', icon: PlaceIcon, color: 'text-teal-600 dark:text-teal-400' },
];