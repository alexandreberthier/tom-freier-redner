<template>
  <div class="language-selection">
    <div class="selected-option" @click="toggleLanguageOptions">
      <div class="icon-wrapper">
        <img :src="getImage(currentLanguage === 'de' ? 'ic_german.png' : 'ic_english.png')"
             :alt="currentLanguage === 'de' ? 'Deutsch' : 'English'">
      </div>
      <p>{{ currentLanguage.toUpperCase() }}</p>
    </div>
    <div class="language-options" v-if="showLanguageOptions">
      <div
          class="option"
          v-for="(lang, index) in availableLanguages"
          :key="index"
          @click="changeLanguage(lang)">
        <div class="icon-wrapper">
          <img :src="getImage(lang === 'de' ? 'ic_german.png' : 'ic_english.png')"
               :alt="lang === 'de' ? 'Deutsch' : 'English'">
        </div>
        <p>{{ lang.toUpperCase() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {getImage} from "@/utils/ImageUtils";
import {useCentralStore} from "@/stores/central";
import {computed, ref} from "vue";

const centralStore = useCentralStore()
const showLanguageOptions = ref(false);
const currentLanguage = computed(() => centralStore.currentLanguage as 'de' | 'en');

const availableLanguages = computed<('de' | 'en')[]>(() => {
  return ['de', 'en'].filter(lang => lang !== currentLanguage.value) as ('de' | 'en')[];
})

function toggleLanguageOptions() {
  showLanguageOptions.value = !showLanguageOptions.value;
}

function changeLanguage(lang: 'de' | 'en') {
  centralStore.changeLanguage(lang);
  showLanguageOptions.value = false;
}
</script>

<style scoped>

.language-selection {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 50px;
  background-color: var(--white);
  border-radius: 4px;
  box-sizing: border-box;

  img {
    width: 32px;
    height: 32px;
  }

  p {
    font-size: 16px;
  }

  .selected-option, .option {
    display: flex;
    align-items: center;
    gap: 5px;
    box-sizing: border-box;
    padding: 0 6px;
  }

  .language-options {
    position: absolute;
    top: 105%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    align-items: flex-start;
  }
}


</style>