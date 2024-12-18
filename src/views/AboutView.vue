<template>
  <StaticSiteLayout
      :header="translations.aboutHeader"
      :subHeaderText="translations.aboutSubText"
      :image1="'img_tom11_lou.webp'"
      image1alt="Benni und Tom"
      :image2="'Freier-Redner-Tom_92.webp'"
      image2alt="Tom und Freunde"
      :main-text-header="translations.aboutMainTextHeader"
      :mainText1="translations.aboutMainText1"
      :mainText2="translations.aboutMainText2"
      :faqs="faqs"
      :quotes="quotes"
  >
    <section class="bottom-section">
      <div class="image-wrapper">
        <iframe width="100%" height="100%"
                src="https://www.youtube.com/embed/1lKrSjl0ZfY?si=Oo4WPTniUHe8gDdj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
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
    border-radius: 14px;

    iframe {
      width: 100%;
      aspect-ratio: 16 / 9;
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

      .icon-wrapper {
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .bottom-section {
    flex-direction: row;
    gap: unset;
    justify-content: space-between;
    align-items: center;

    .image-wrapper {
      iframe {
        width: 400px;
        aspect-ratio: 16 / 9;
        border-radius: 14px;
        height: auto;
      }
    }

    .skill-flex {
      gap: 32px;
    }
  }
}

@media (min-width: 1920px) {
  .bottom-section {
    flex-direction: row;
    gap: 60px;
    justify-content: center;


    .image-wrapper {
      iframe {
        width: 600px;
        aspect-ratio: 16 / 9;
        border-radius: 14px;
        height: auto;
      }
    }

    .skill-flex {
      gap: 50px;
    }
  }
}


</style>