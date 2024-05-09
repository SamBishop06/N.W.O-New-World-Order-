import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { settings } from './settings';


// Function to load language files and add to i18n resources.
export async function loadLocale(locale = settings.locale) {
	try {
		// Try to load locale.
		const module = await import(`../locales/${locale}.json`);
		// Add loaded translations to i18n resource bundle.
		i18n.addResourceBundle(locale, 'translation', module.default);
	} catch (error) {
		// If initial locale load failed, try to load the default language from settings.
		if (locale !== settings.locale.default) await loadLocale(settings.locale.default);
		else console.error('Error loading English language file:', error);
	}

	// Switch i18n instance to new language.
	await i18n.changeLanguage(locale);
}

// Initialize i18n instance and set default language to English.
export default i18n
	.use(initReactI18next)
	.init({
		      lng:           'en',
		      fallbackLng:   'en',
		      interpolation: {
			      escapeValue: false,
		      },
		      returnObjects: true,
		      initImmediate: false,
	      });

// Load initial language translations.
(async () => await loadLocale(i18n.language))();
