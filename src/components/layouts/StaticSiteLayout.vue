<template>
  <div class="content-wrapper">
    <section class="header-section">
      <h1>{{header}}</h1>
      <p class="sub-header-text">{{subHeaderText}}</p>
    </section>

    <section class="main-section">
      <div class="top-wrapper">
        <div class="image-wrapper">
          <img :src="getImage(image1)" alt="image">
        </div>
        <div class="heading-text">
          <h2>{{ mainTextHeader }}</h2>
          <p class="main-text1" v-html="mainText1"></p>
        </div>
      </div>
      <div class="bottom-wrapper">
        <p class="main-text2" v-html="mainText2"></p>
        <div class="image-wrapper">
          <img :src="getImage(image2)" alt="image">
        </div>
      </div>
    </section>

    <section class="faq-section">
      <DynamicAccordion
          :accordion-items="faqs"
      />
    </section>

    <section class="quote-section">
      <DynamicSlider
          :auto-rotate="true"
          :arrow-navigation="true">
        <div
            v-for="(quote, index) in quotes"
            :key="index"
            class="quote">
          <div class="image-wrapper">
            <img :src="getImage('ic_quote.png')" alt="image">
          </div>
          <p class="text">{{ quote.text }}</p>
          <p class="author"> - {{ quote.author }}</p>
        </div>
      </DynamicSlider>
    </section>

    <slot></slot>
  </div>


</template>

<script setup lang="ts">
import {getImage} from "@/utils/ImageUtils";
import DynamicAccordion from "@/components/DynamicAccordion.vue";
import DynamicSlider from "@/components/DynamicSlider.vue";
import type {FaqItem, Quote} from "@/models/PropInterfaces";

defineProps<{
  header:string,
  subHeaderText: string
  image1: string,
  image2: string,
  mainTextHeader:string
  mainText1:string,
  mainText2:string
  faqs: FaqItem[]
  quotes: Quote[]
}>()





</script>

<style scoped>
.header-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .top-wrapper, .bottom-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .main-text1, .main-text2, .heading-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .image-wrapper {
    img {
      width: 100%;
      height: 100%;
      border-radius: 14px;
    }
  }
}

.quote-section {
  .quote {
    width: 320px;
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


@media (min-width: 740px) {
  .quote-section {
    .quote {
      width: 620px;

      .text {
        font-size: 24px;
        font-style: italic;
        font-family: Playfair, sans-serif;
      }

      .author {
        font-size: 18px;
      }
    }
  }

}

@media (min-width: 1200px) {
  .header-section {
    display: flex;
    flex-direction: row;
    gap: unset;
    justify-content: space-between;

    h1 {
      width: 50%;
    }

    .sub-header-text {
      width: 50%;
    }
  }

  .main-section {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .top-wrapper, .bottom-wrapper {
      display: flex;
      flex-direction: row;
      gap: 32px;
      width: 100%;
      justify-content: center;
    }

    h3 {
      width: 415px;
    }

    .main-text1, .main-text2 {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 415px;
    }

    .image-wrapper {
      max-height: 480px;
      width: 415px;
      justify-content: flex-start;

      img {
        object-fit: cover;
      }
    }
  }

  .quote-section {
    .quote {
      width: 860px;
    }
  }
}

@media (min-width: 1920px) {
  .main-section {

    h3 {
      width: 600px;
    }

    .main-text1, .main-text2 {
      width: 600px;
    }

    .image-wrapper {
      width: 600px;
    }
  }

  .quote-section {
    .quote {
      width: 1260px;
      .text {
        font-size: 26px;
      }

      .author {
        font-size: 20px;
      }
    }
  }
}


</style>