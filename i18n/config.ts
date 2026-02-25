import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources, type AppLanguage } from "@/i18n/resources";

export const supportedLanguages = Object.keys(resources) as AppLanguage[];
export const defaultLanguage: AppLanguage = "en";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages,
      nonExplicitSupportedLngs: true,
      load: "languageOnly",
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
