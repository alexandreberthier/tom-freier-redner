<template>
  <div class="outer-wrapper">
    <div class="accordion-wrapper">
      <AccordionItem
          v-for="faq in accordionItems"
          :key="faq.id"
          :faq="faq"
          :is-open="activeIndex === faq.id"
          @toggleContent="toggleContent(faq.id)"
      />
    </div>
    <div v-if="showCTA" class="contact-section">
      <h3>Noch Fragen?</h3>
      <p>Ich bin gerne für dich da – melde dich bei mir!</p>
      <DynamicButton
          :has-link="true"
          path-name="home"
          hash="#contact"
          button-text="Kontakt"
          :button-type="ButtonType.Primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">


import type {FaqItem} from "@/models/PropInterfaces";
import {ref, type Ref} from "vue";
import {ButtonType} from "@/models/Enums";
import AccordionItem from "@/components/AccordionItem.vue";
import DynamicButton from "@/components/DynamicButton.vue";

defineProps<{
  accordionItems: FaqItem[]
  showCTA?: boolean
}>()

const activeIndex: Ref<number | null> = ref(null)

function toggleContent(id: number) {
  activeIndex.value = activeIndex.value === id ? null : id
}

</script>

<style scoped>

.outer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .accordion-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contact-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }
}
</style>