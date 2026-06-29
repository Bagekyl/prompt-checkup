import { en } from './en';
import { ja } from './ja';
import { zh } from './zh';
import type { Dictionary, Language } from './types';

export type { Dictionary, Language };

export const dictionaries: Record<Language, Dictionary> = {
  en,
  ja,
  zh
};
