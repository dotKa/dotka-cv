import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { defaultLanguage, languageStorageKey, messages, supportedLanguages } from "./locales";

export const I18nContext = createContext(null);

function normalizeLanguage(language) {
  const normalized = String(language || "").toLowerCase();
  if (supportedLanguages.includes(normalized)) return normalized;
  if (normalized.startsWith("tr")) return "tr";
  return defaultLanguage;
}

function getInitialLanguage() {
  if (typeof window === "undefined") return defaultLanguage;

  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  if (supportedLanguages.includes(storedLanguage)) return storedLanguage;

  return normalizeLanguage(window.navigator.language);
}

function getNestedValue(source, key) {
  return key.split(".").reduce((value, part) => {
    if (value && Object.prototype.hasOwnProperty.call(value, part)) {
      return value[part];
    }

    return undefined;
  }, source);
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(normalizeLanguage(nextLanguage));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    function t(key) {
      return getNestedValue(messages[language], key) ?? getNestedValue(messages[defaultLanguage], key) ?? key;
    }

    return {
      language,
      setLanguage,
      supportedLanguages,
      t
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
