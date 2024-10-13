<template>
 <StaticSiteLayout
     :header="translations.aboutHeader"
     :subHeaderText="translations.aboutSubText"
     :image1="'img_tom1-min.jpeg'"
     :image2="'img_tom4-min.jpeg'"
     :main-text-header="translations.aboutMainTextHeader"
     :mainText1="translations.aboutMainText2"
     :mainText2="translations.aboutMainText2"
     :faqs="faqs"
     :quotes="quotes"
 >
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
 </StaticSiteLayout>
</template>

<script setup lang="ts">
import StaticSiteLayout from "@/components/layouts/StaticSiteLayout.vue";
import {useCentralStore} from "@/stores/central";
import {computed, type ComputedRef} from "vue";
import type {Quote} from "@/models/PropInterfaces";
import {getImage} from "@/utils/ImageUtils";
const centerStore = useCentralStore()

const translations = computed(() => {
  return centerStore.translations
})

const quotes: ComputedRef<Quote[]> = computed(() => [
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
    question: translations.value.aboutFaqQuestion1,
    answer: translations.value.aboutFaqAnswer1
  },
  {
    id: 2,
    question: translations.value.aboutFaqQuestion2,
    answer: translations.value.aboutFaqAnswer2
  },
  {
    id: 3,
    question: translations.value.aboutFaqQuestion3,
    answer: translations.value.aboutFaqAnswer3
  },
  {
    id: 4,
    question: translations.value.aboutFaqQuestion4,
    answer: translations.value.aboutFaqAnswer4
  },
  {
    id: 5,
    question: translations.value.aboutFaqQuestion5,
    answer: translations.value.aboutFaqAnswer5
  }
])

const skills = computed(() => [
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
    flex-wrap: wrap;


    .skill {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

@media (min-width: 1200px) {
  .bottom-section {
    .skill-flex {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .image-wrapper {
      img {
        width: 100%;
        height: 350px;
        object-fit: cover;
      }
    }
  }
}

@media (min-width: 1920px) {
  .bottom-section {
    .image-wrapper {
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
    }
  }
}



</style>