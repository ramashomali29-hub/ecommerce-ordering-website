'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('luckcookies_language');
    if (savedLanguage === 'ar' || savedLanguage === 'en') {
      queueMicrotask(() => setLanguage(savedLanguage));
    }
  }, []);

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('luckcookies_language', language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === 'ar' ? 'en' : 'ar'));
  }

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
