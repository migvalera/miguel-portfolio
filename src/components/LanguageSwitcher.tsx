import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LANG_STORAGE_KEY } from '@/i18n';

const SUPPORTED_LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem(LANG_STORAGE_KEY, nextLang);
  };

  const currentLabel = SUPPORTED_LANGS.find((l) => l.code === currentLang)?.label ?? currentLang.toUpperCase();
  const ariaLabel = currentLang === 'en' ? 'Switch to Spanish (Español)' : 'Switch to English';

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2 font-manrope text-nav text-dark-grey cursor-pointer transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md py-1.5 px-2 min-w-[72px] justify-center md:justify-start"
      aria-label={ariaLabel}
    >
      <Globe
        className="w-4 h-4 flex-shrink-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0.85 }}
        aria-hidden
      />
      <span className="font-medium text-black transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0.9 }}>
        {currentLabel}
      </span>
    </button>
  );
}
