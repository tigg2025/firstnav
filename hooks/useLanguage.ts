"use client"

import { useState, useEffect } from "react"
import { translations, type Language } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("zh")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = translations[language]

  return { language, changeLanguage, t }
}
