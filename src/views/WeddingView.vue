<template>
  <StaticSiteLayout
      :header="translations.weddingHeader"
      :subHeaderText="translations.weddingSubText"
      :image1="'img_tom3.webp'"
      image1alt="Laura und Tom"
      :image2="'img_tom10.webp'"
      image2alt="Hochzeit von Philip und Maxi"
      :main-text-header="translations.weddingMainTextHeader"
      :mainText1="translations.weddingMainText1"
      :mainText2="translations.weddingMainText2"
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
    question: translations.value.weddingFaqQuestion1,
    answer: translations.value.weddingFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.weddingFaqQuestion2,
    answer: translations.value.weddingFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.weddingFaqQuestion3,
    answer: translations.value.weddingFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.weddingFaqQuestion4,
    answer: translations.value.weddingFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.weddingFaqQuestion5,
    answer: translations.value.weddingFaqAnswer5
  }
])

</script>

<style scoped>

</style>