import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, TranslationKey } from '../types';
import { TRANSLATIONS, CATEGORIES_TRANSLATION } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
  getCategoryName: (cat: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (section: string, key: string) => {
    // @ts-ignore
    return TRANSLATIONS[language]?.[section]?.[key] || key;
  };

  const getCategoryName = (cat: string) => {
    const key = cat === "Tümü" ? "all" : cat;
    return CATEGORIES_TRANSLATION[key]?.[language] || cat;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCategoryName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};