<template>
  <StaticSiteLayout
      :header="translations.childCelebrationHeaderSmall"
      :subHeaderText="translations.childCelebrationSubText"
      :image1="'img_tom3-min.jpeg'"
      :image2="'img_tom5-min.jpeg'"
      :main-text-header="translations.childCelebrationMainTextHeader"
      :mainText1="translations.childCelebrationMainText1"
      :mainText2="translations.childCelebrationMainText2"
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
    question: translations.value.childCelebrationFaqQuestion1,
    answer: translations.value.childCelebrationFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.childCelebrationFaqQuestion2,
    answer: translations.value.childCelebrationFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.childCelebrationFaqQuestion3,
    answer: translations.value.childCelebrationFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.childCelebrationFaqQuestion4,
    answer: translations.value.childCelebrationFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.childCelebrationFaqQuestion5,
    answer: translations.value.childCelebrationFaqAnswer5
  }
])

</script>

<style scoped>

</style>