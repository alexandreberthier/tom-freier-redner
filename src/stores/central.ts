import { defineStore } from "pinia";
import { computed, ref } from "vue";
import de from '@/texts/de.json';
import en from '@/texts/en.json';
import type { Translations } from "@/texts/Translations";

type LanguageKey = 'de' | 'en';

export const useCentralStore = defineStore('central', () => {
    const languages = ref<{ de: Translations; en: Translations }>({ de, en });
    const currentLanguage = ref<LanguageKey>(getStoredLanguage() || getUserLanguage() || 'de');
    const darkMode = ref<boolean>(localStorage.getItem('darkMode') === 'true' || false);

    function getStoredLanguage(): LanguageKey | null {
        const lang = localStorage.getItem('lang') as LanguageKey | null;
        return lang === 'de' || lang === 'en' ? lang : null;
    }

    function getUserLanguage(): LanguageKey {
        const userLang = navigator.language || navigator.languages[0];
        return userLang.startsWith('de') ? 'de' : 'en';
    }

    const translations = computed<Translations>(() => {
        return languages.value[currentLanguage.value];
    });

    function changeLanguage(lang: LanguageKey) {
        currentLanguage.value = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'de') {
            document.title = 'Freier Redner für Hochzeiten, Trauerfeiern und Lebensfeiern | Tom Salzlechner';
            document.querySelector('meta[name="description"]')?.setAttribute('content', 'Freier Redner für Hochzeiten, Trauerfeiern und Kinderwillkommensfeste.');
        } else {
            document.title = 'Freelance Speaker for Weddings, Funerals, and Celebrations | Tom Salzlechner';
            document.querySelector('meta[name="description"]')?.setAttribute('content', 'Freelance speaker for weddings, funerals, naming ceremonies, and life celebrations.');
        }

        document.documentElement.lang = lang;
    }

    function toggleDarkMode() {
        darkMode.value = !darkMode.value;
        localStorage.setItem('darkMode', String(darkMode.value));
        document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light');
    }

    return {
        changeLanguage,
        translations,
        currentLanguage,
        darkMode,
        toggleDarkMode
    };
});
