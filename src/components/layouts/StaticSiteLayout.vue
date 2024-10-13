<template>
  <div class="content-wrapper">
    <section class="header-section">
      <h1>Über mich</h1>
      <p class="sub-header-text">
        Schön, dass du hier bist. Ich freue mich, dich bei der Gestaltung einer unvergesslichen Zeremonie zu begleiten –
        ganz nach deinen Wünschen und Vorstellungen.
      </p>
    </section>

    <section class="main-section">
      <div class="image-wrapper img1">
        <img :src="getImage('img_tom1-min.jpeg')" alt="image">
      </div>
      <div class="text-wrapper">
        <h3>Einfach Ich</h3>
        <p class="main-text" v-html="translations.aboutMainText"></p>
      </div>
      <div class="image-wrapper img1">
        <img :src="getImage('img_tom4-min.jpeg')" alt="image">
      </div>
    </section>

    <section class="faq-section">
      <DynamicAccordion :accordion-items="faqs"/>
    </section>

    <section class="quote-section">
      <DynamicSlider>
        <div
            v-for="(quote, index) in quotes"
            :key="index"
            class="quote">
          <div class="image-wrapper">
            <img :src="getImage('ic_quote.png')" alt="image">
          </div>
          <p class="text">{{ quote.text }}</p>
          <p class="author"> - {{quote.author}}</p>
        </div>
      </DynamicSlider>
    </section>

    <section class="bottom-section">
        <div class="image-wrapper">
          <img :src="getImage('img_tom1-min.jpeg')" alt="image">
        </div>
        <div class="skill-flex">
          <div
              v-for="(skill, index) in skills"
              :key="index"
              class="skill">
            <div class="icon-wrapper">
              <img :src="getImage(skill.image)" :alt="skill.alt">
            </div>
            <p>{{ skill.text }}</p>
          </div>
        </div>
    </section>
  </div>


</template>

<script setup lang="ts">
import {getImage} from "@/utils/ImageUtils";
import {useCentralStore} from "@/stores/central";
import {computed, type ComputedRef, ref} from "vue";
import DynamicAccordion from "@/components/DynamicAccordion.vue";
import DynamicSlider from "@/components/DynamicSlider.vue";
import type {Quote} from "@/models/PropInterfaces";

const centerStore = useCentralStore()

const translations = computed(() => {
  return centerStore.translations
})

const quotes: ComputedRef<Quote[]>  = computed(() => [
  {
    text: translations.value.quote1,
    author: 'Tom'
  },
  {
    text: translations.value.quote2,
    author: 'Tom'
  },
  {
    text: translations.value.quote3,
    author: 'Tom'
  }
])

const faqs = computed(() => [
  {
    id: 1,
    question: translations.value.homeFaqQuestion1,
    answer: translations.value.homeFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.homeFaqQuestion2,
    answer: translations.value.homeFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.homeFaqQuestion3,
    answer: translations.value.homeFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.homeFaqQuestion4,
    answer: translations.value.homeFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.homeFaqQuestion5,
    answer: translations.value.homeFaqAnswer5
  }
])

const skills = computed(()=> [
  {
    image: 'ic_language.png',
    alt: 'hut',
    text: translations.value.aboutSkill1
  },
  {
    image: 'ic_microphone.png',
    alt: 'mikrofon',
    text: translations.value.aboutSkill2
  },
  {
    image: 'ic_palette.png',
    alt: 'palette',
    text: translations.value.aboutSkill3
  },
  {
    image: 'ic_graduation.png',
    alt: 'ausbildung',
    text: translations.value.aboutSkill4
  }
])

</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-section {
  display: grid;
  grid-row-gap: 36px;

  .image-wrapper {
    img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
    }
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .main-text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
}

.quote-section {
  .quote {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;

    .image-wrapper {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .text {
      font-size: 20px;
      font-style: italic;
      font-family: Bitter, sans-serif;
    }

    .author {
      font-size: 16px;
    }
  }
}

.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .image-wrapper {
    img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
    }
  }

  .skill-flex {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    .skill {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}



</style>