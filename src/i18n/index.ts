import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enAbout from '@/locales/en/about.json';
import enProjects from '@/locales/en/projects.json';
import enProject1 from '@/locales/en/project1.json';
import enProject2 from '@/locales/en/project2.json';
import enProject3 from '@/locales/en/project3.json';
import enProject4 from '@/locales/en/project4.json';

import esCommon from '@/locales/es/common.json';
import esHome from '@/locales/es/home.json';
import esAbout from '@/locales/es/about.json';
import esProjects from '@/locales/es/projects.json';
import esProject1 from '@/locales/es/project1.json';
import esProject2 from '@/locales/es/project2.json';
import esProject3 from '@/locales/es/project3.json';
import esProject4 from '@/locales/es/project4.json';

const STORAGE_KEY = 'portfolio-lang';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        about: enAbout,
        projects: enProjects,
        project1: enProject1,
        project2: enProject2,
        project3: enProject3,
        project4: enProject4,
      },
      es: {
        common: esCommon,
        home: esHome,
        about: esAbout,
        projects: esProjects,
        project1: esProject1,
        project2: esProject2,
        project3: esProject3,
        project4: esProject4,
      },
    },
    fallbackLng: 'es',
    supportedLngs: ['en', 'es'],
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'projects', 'project1', 'project2', 'project3', 'project4'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const LANG_STORAGE_KEY = STORAGE_KEY;
export default i18n;
