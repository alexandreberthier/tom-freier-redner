import { defineStore } from "pinia";
import de from '@/texts/de.json'
import en from '@/texts/en.json'
import { computed, ref } from "vue";

type LanguageKey = 'de' | 'en';

export const useCentralStore = defineStore('central', () => {
    const languages = ref({ de, en })
    const currentLanguage = ref<LanguageKey>(localStorage.getItem('lang') as LanguageKey || getUserLanguage())

    function getUserLanguage(): LanguageKey {
        const userLang = navigator.language || navigator.userAgent;
        return userLang.startsWith('de') ? 'de' : 'en';
    }

    const translations = computed<Record<string, string>>(() => {
        return languages.value[currentLanguage.value];
    });


    function changeLanguage(lang: LanguageKey) {
        currentLanguage.value = lang;
    }

    return {
        changeLanguage,
        translations,
        currentLanguage
    }
})
