"use client";

import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AppLanguage } from "@/i18n/resources";

const languageOptions: { value: AppLanguage; labelKey: string }[] = [
  { value: "pt", labelKey: "language.portuguese" },
  { value: "en", labelKey: "language.english" },
  { value: "es", labelKey: "language.spanish" },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const selectedLanguage = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value as AppLanguage);
  };

  return (
    <label className="inline-flex items-center gap-2 px-3 h-11 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 text-sm font-semibold">
      <Globe className="w-4 h-4 text-blue-400" />
      <span className="hidden sm:inline">{t("language.label")}</span>
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="bg-transparent text-slate-100 outline-none cursor-pointer"
        aria-label={t("language.label")}
      >
        {languageOptions.map(({ value, labelKey }) => (
          <option key={value} value={value} className="bg-slate-900 text-slate-100">
            {t(labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
