import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./En/translation.json";
import translationJP from "./Jp/translation.json";
import translationVI from "./Vi/translation.json";


const resources = {
	en: {
		translation: translationEN,
	},
	jp: {
		translation: translationJP,
	},
	vi: {
		translation: translationVI,
	},
};


i18n
	.use(initReactI18next)
	.init({
		resources,
		lng:
			i18n.language ||
				typeof window !== 'undefined' ? window.localStorage.i18nextLng : 'vi' ||
			process.env.REACT_APP_DEFAULT_LANGUAGE,
		fallbackLng: "vi",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
