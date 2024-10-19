<template>
  <div class="content-wrapper">
    <h1>{{ translations.imprintHeader }}</h1>
    <StaticSection :section-header="translations.imprintSectionHeader1">
      <div class="text-section">
        <p>Thomas Salzlechner</p>
        <p>Mühlbachstraße 51</p>
        <p>5201 Seekirchen</p>
        <p>Österreich</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader2">
      <div class="text-section">
        <p>Telefon: +436602802923</p>
        <p>E-Mail: tom.s@freieredner.at</p>
        <p>Website: www.freier-redner-tom.at</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader3">
      <div class="text-section">
        <p>{{translations.imprintSectionText3}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader4">
      <div class="text-section" v-html="translations.imprintSectionText4"></div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader5">
      <div class="text-section">
        <p>{{translations.imprintSectionText5}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader6">
      <div class="text-section">
        <p>Thomas Salzlechner</p>
        <p>Mühlbachstraße 51</p>
        <p>5201 Seekirchen</p>
        <p>Österreich</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader7">
      <div class="text-section">
        <p>{{translations.imprintSectionText7}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader8">
      <div class="text-section">
        <p>{{translations.imprintSectionText8}}</p>
      </div>
    </StaticSection>
    <StaticSection :section-header="translations.imprintSectionHeader9">
      <div class="text-section" v-html="translations.imprintSectionText9"></div>
    </StaticSection>
  </div>
</template>

<script setup lang="ts">
import StaticSection from "@/components/layouts/StaticSection.vue";
import {useCentralStore} from "@/stores/central";
import {computed} from "vue";

const centralStore = useCentralStore()

const translations = computed(()=> {
  return centralStore.translations
})
</script>
