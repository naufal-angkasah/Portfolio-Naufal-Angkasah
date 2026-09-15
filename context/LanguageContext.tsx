"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    // 1) Cek localStorage dulu
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    let initial: Language = "id";
    if (saved === "id" || saved === "en") {
      initial = saved;
    } else {
      const browserLang = navigator.language || "";
      if (browserLang.startsWith("en")) {
        initial = "en";
      }
    }
    if (initial !== "id") {
      queueMicrotask(() => {
        setLanguageState(initial);
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === "id" ? "en" : "id";
    setLanguageState(nextLang);
    localStorage.setItem("portfolio_lang", nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
