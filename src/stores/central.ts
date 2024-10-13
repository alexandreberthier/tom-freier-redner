import { defineStore } from "pinia";
import de from '@/texts/de.json';
import en from '@/texts/en.json';
import { computed, ref } from "vue";
import type { Translations } from "@/texts/Translations";

type LanguageKey = 'de' | 'en';

export const useCentralStore = defineStore('central', () => {
    const languages = ref<{ de: Translations; en: Translations }>({ de, en });
    const currentLanguage = ref<LanguageKey>(localStorage.getItem('lang') as LanguageKey || getUserLanguage());

    function getUserLanguage(): LanguageKey {
        const userLang = navigator.language || navigator.userAgent;
        return userLang.startsWith('de') ? 'de' : 'en';
    }

    const translations = computed<Translations>(() => {
        return languages.value[currentLanguage.value];
    })

    function changeLanguage(lang: LanguageKey) {
        currentLanguage.value = lang;
        localStorage.setItem('lang', lang);
    }

    return {
        changeLanguage,
        translations,
        currentLanguage
    }
})