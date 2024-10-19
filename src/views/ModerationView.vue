<template>
  <StaticSiteLayout
      :header="translations.moderationHeader"
      :subHeaderText="translations.moderationSubText"
      :image1="'img_tom19.webp'"
      image1alt="Tom mit Mikrofon"
      :image2="'img_tom15.webp'"
      image2alt="Tom mit Sonnenbrille"
      :main-text-header="translations.moderationMainTextHeader"
      :mainText1="translations.moderationMainText1"
      :mainText2="translations.moderationMainText2"
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
    question: translations.value.moderationFaqQuestion1,
    answer: translations.value.moderationFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.moderationFaqQuestion2,
    answer: translations.value.moderationFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.moderationFaqQuestion3,
    answer: translations.value.moderationFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.moderationFaqQuestion4,
    answer: translations.value.moderationFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.moderationFaqQuestion5,
    answer: translations.value.moderationFaqAnswer5
  }
])

</script>

<style scoped>

</style>