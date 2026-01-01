"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, QuizResponse } from '../lib/types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  quizResponses: QuizResponse;
  setQuizResponses: (responses: QuizResponse) => void;
  updateQuizResponse: (questionId: string, value: string | string[] | boolean) => void;
  clearQuiz: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Simple translation dictionary for UI elements
const UI_TRANSLATIONS: Record<string, { en: string; es: string }> = {
  'app.title': { en: 'Aging at Home Hub', es: 'Centro de Envejecimiento en Casa' },
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.quiz': { en: 'Safety Quiz', es: 'Cuestionario' },
  'nav.resources': { en: 'Resources', es: 'Recursos' },
  'nav.plan': { en: 'My Plan', es: 'Mi Plan' },
  'btn.start': { en: 'Get Started', es: 'Comenzar' },
  'btn.next': { en: 'Next', es: 'Siguiente' },
  'btn.back': { en: 'Back', es: 'Atrás' },
  'btn.submit': { en: 'Submit', es: 'Enviar' },
  'btn.retake': { en: 'Retake Quiz', es: 'Repetir Cuestionario' },
  'btn.print': { en: 'Print Plan', es: 'Imprimir Plan' },
  'footer.privacy': { en: 'Privacy Policy', es: 'Política de Privacidad' },
  'footer.contact': { en: 'Contact Us', es: 'Contáctenos' },
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [quizResponses, setQuizResponses] = useState<QuizResponse>({});

  // Load from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('aah_language') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedQuiz = localStorage.getItem('aah_quiz');
    if (savedQuiz) setQuizResponses(JSON.parse(savedQuiz));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('aah_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('aah_quiz', JSON.stringify(quizResponses));
  }, [quizResponses]);

  const updateQuizResponse = (questionId: string, value: string | string[] | boolean) => {
    setQuizResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const clearQuiz = () => {
    setQuizResponses({});
    localStorage.removeItem('aah_quiz');
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[key]?.[language] || key;
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      setLanguage, 
      quizResponses, 
      setQuizResponses, 
      updateQuizResponse, 
      clearQuiz,
      t 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

