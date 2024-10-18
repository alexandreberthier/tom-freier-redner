<template>
  <StaticSiteLayout
      header="Besondere Feiern erfordern besondere Worte"
      subHeaderText="Hochzeiten, Lebensfeiern und Kinderwillkommensfeste beschreiben meist neue Abschnitte im Leben von Menschen – natürlich gibt es noch weitere Momente oder Ereignisse, die es wert sind, gemeinsam anzuhalten. Gerne begleite ich jegliche Art von Feiern, Zeremonien oder Veranstaltungen."
      :image1="'img_tom15.jpeg'"
      :image2="'img_tom_17.png'"
      main-text-header="Firmenfeiern & Jubiläen"
      mainText1="
Die wichtigste und meist gefragteste „Ressource“ in einem Unternehmen ist der Mensch selbst. Gute Mitarbeiter*innen sind schwer zu finden und noch schwieriger zu halten. Firmenfeiern & Jubiläen sind Arten Mitarbeiter*innen wertzuschätzen und die Wirkung von Wertschätzungen dürfen nicht unterschätzt werden. Aus diesem Grund würde es mich freuen, wenn ich eure Firmenfeier oder Jubiläen mit meinen Worten und meiner Persönlichkeit gestalten, sowie begleiten darf.
"
      mainText2="
Ihr habt eine Veranstaltung geplant, aber noch nicht den richtigen Moderator gefunden?
Bei mir seid ihr richtig – durch mein humorvolles, offenes & empathisches Wesen hole ich eure Gäste ab, nehme sie an der Hand und führe sie durch eure Veranstaltung. <b> Erneuerung von Eheversprechen </b> <br>
Nach Jahren des gemeinsamen Lebens, finde ich es schön, wenn Eheversprechen erneuert werden. Immerhin hat man gemeinsam sehr schöne, aber auch schwere Zeiten erlebt, da ist es doch schön, sich die gegenseitige Liebe erneut zu gestehen. Ein selbstgeschriebenes Gelöbnis, der richtige Rahmen und natürlich meine Worte, sorgen für eine unvergessliche Ehrung eures Versprechens.

"
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