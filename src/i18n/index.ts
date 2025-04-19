import { initReactI18next } from "react-i18next";

import * as i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import * as en from "./locales/en/index";
import * as ko from "./locales/ko/index";

const fallbackLng = ["ko"];

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        ...en,
      },
      ko: {
        ...ko,
      },
    },
    fallbackLng,
    interpolation: {
      escapeValue: false,
      defaultVariables: {
        en: true,
        ko: true,
      },
    },
  });

export default i18n;
