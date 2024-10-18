<template>
  <StaticSiteLayout
      :header="translations.funeralHeader"
      :subHeaderText="translations.funeralSubText"
      :image1="'img_tom9.jpeg'"
      :image2="'img_tom5-min.webp'"
      :main-text-header="translations.funeralMainTextHeader"
      :mainText1="translations.funeralMainText1"
      :mainText2="translations.funeralMainText2"
      :faqs="faqs"
      :quotes="quotes"
  >
  </StaticSiteLayout>
</template>

<script setup lang="ts">
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
import {useCentralStore} from "@/stores/central";
import {computed, type ComputedRef} from "vue";
import type {Quote} from "@/models/PropInterfaces";
const centerStore = useCentralStore()

const translations = computed(() => {
  return centerStore.translations
})

const quotes: ComputedRef<Quote[]> = computed(() => [
  {
    text: translations.value.guestComment1,
    author: 'Benjamin'
  },
  {
    text: translations.value.guestComment2,
    author: 'Maxi und Philip'
  },
  {
    text: translations.value.guestComment3,
    author: 'Elisabeth'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: translations.value.funeralFaqQuestion1,
    answer: translations.value.funeralFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.funeralFaqQuestion2,
    answer: translations.value.funeralFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.funeralFaqQuestion3,
    answer: translations.value.funeralFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.funeralFaqQuestion4,
    answer: translations.value.funeralFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.funeralFaqQuestion5,
    answer: translations.value.funeralFaqAnswer5
  }
])

</script>

<style scoped>

</style>