<template>
  <div class="parallax-container">
    <div class="background">
      <div class="overlay"></div>
    </div>
    <header>
      <h1 :style="{ transform: `translateY(-${parallaxYHeader}px)` }" >Mit den Gästen, statt vor den Gästen</h1>
    </header>
      <p class="text-header" :style="{ transform: `translateY(${parallaxYText}px)` }">{{ translations.homeSubText }}</p>
  </div>

  <div class="content-wrapper">
    <section ref="hero" class="hero fade-up">
     <h1>{{ translations.homeHeader }}</h1>
      <p>{{ translations.homeSubText }}</p>
      <div class="button-section">
        <DynamicButton
            :button-type="ButtonType.Primary"
            :has-link="true"
            path-name="home"
            hash="#contact"
            :button-text="translations.letsSpeak"
        />
        <DynamicButton
            :button-type="ButtonType.Secondary"
            :has-link="true"
            path-name="about"
            :button-text="translations.aboutMe"
        />
      </div>
    </section>
    <section class="hero-images">
      <div ref="image1" class="image-wrapper fade-up">
        <img class="image1" :src="getImage('img_tom1-min.webp')" alt="hochzeit">
      </div>
      <div ref="image2" class="image-wrapper fade-up">
        <img class="image2" :src="getImage('img_tom5-min.webp')" alt="hochzeit">
      </div>
      <div ref="image3" class="image-wrapper fade-up">
        <img class="image3" :src="getImage('img_tom6-min.webp')" alt="hochzeit">
      </div>
    </section>
  </div>

  <section class="text-section">
    <div ref="textSection" class="text-wrapper fade-up">
      <div class="top-section">
        <h2>{{ translations.homeBannerHeader }}</h2>
        <p>{{ translations.homeBannerText1 }}</p>
      </div>
      <div class="bottom-section">
        <div class="left">
          <p>{{ translations.homeBannerText2 }}</p>
          <p>{{ translations.homeBannerText3 }}</p>
        </div>
        <div class="right">
          <p>{{ translations.homeBannerText4 }}</p>
          <p>{{ translations.homeBannerText5 }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="slider-section">
    <h2>{{ translations.homeServiceSectionHeader }}</h2>
    <DynamicSlider :auto-rotate="false">
      <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          :service="service"
      />
    </DynamicSlider>
  </section>

  <div class="content-wrapper">
    <section class="faq-section">
      <h2>{{ translations.faqsHeader }}</h2>
      <div class="accordion-flex">
        <DynamicAccordion :accordion-items="faqs"/>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <h2>{{ translations.contactHeader }}</h2>
      <p>{{ translations.contactSubText }}</p>
      <div class="contact-options">
        <a v-for="(option, index) in contactOptions"
           :key="index"
           :href="option.href">
          <div class="option">
            <div class="icon-wrapper">
              <img :src="getImage(option.image)" :alt="option.alt">
            </div>
            <p>{{ option.text }}</p>
          </div>
        </a>
      </div>
      <div class="form-section">
        <h3 class="extra-margin">{{ translations.contactForm }}</h3>
        <div class="input-flex">
          <DynamicInputField
              :type="InputType.Text"
              :label="translations.firstName"
              v-model:user-input="firstName"
              v-model:error="firstNameError"
          />
          <DynamicInputField
              :type="InputType.Text"
              :label="translations.lastName"
              v-model:user-input="lastName"
              v-model:error="lastNameError"
          />
        </div>
        <div class="input-flex">
          <DynamicInputField
              :label="translations.email"
              :type="InputType.Email"
              v-model:user-input="email"
              v-model:error="emailError"
          />
          <DynamicInputField
              :label="translations.phoneNumber"
              :type="InputType.Phone"
              v-model:user-input="phoneNumber"
              v-model:error="phoneNumberError"
          />
        </div>
        <DynamicInputField
            :type="InputType.Text"
            :label="translations.yourMessage"
            :text-area="true"
            v-model:user-input="message"
            v-model:error="messageError"
        />
        <div class="button-wrapper">
          <DynamicButton
              @click="sendContactForm"
              :button-text="translations.sendButton"
              :button-type="ButtonType.Primary"
          />
          <p v-if="successMessage">{{ successMessage }}</p>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
import {computed, type ComputedRef, nextTick, onMounted, onUnmounted, type Ref, ref} from 'vue';
import DynamicButton from "@/components/DynamicButton.vue";

import {getImage} from "@/utils/ImageUtils";
import DynamicSlider from "@/components/DynamicSlider.vue";
import ServiceCard from "@/components/ServiceCard.vue";
import type {Service} from "@/models/PropInterfaces";
import {ButtonType, InputType} from "@/models/Enums";
import DynamicAccordion from "@/components/DynamicAccordion.vue";
import DynamicInputField from "@/components/DynamicInputField.vue";
import emailjs from 'emailjs-com';
import {useCentralStore} from "@/stores/central";

interface ContactOption {
  href: string,
  text: string,
  image: string,
  alt: string
}

const centralStore = useCentralStore()

const translations = computed(() => centralStore.translations);

const parallaxYHeader = ref(0);
const parallaxYText = ref(0);

function handleScroll() {
  let scrollPosition = window.scrollY;

  parallaxYHeader.value = Math.min(scrollPosition * 0.3, 200);  // max. Y-Wert für Header
  parallaxYText.value = Math.min(scrollPosition * 0.2, 150);    // max. Y-Wert für Text
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const firstName: Ref<string> = ref('')
const lastName: Ref<string> = ref('')
const phoneNumber: Ref<string> = ref('')
const email: Ref<string> = ref('')
const message: Ref<string> = ref('')

const firstNameError: Ref<string> = ref('')
const lastNameError: Ref<string> = ref('')
const phoneNumberError: Ref<string> = ref('')
const emailError: Ref<string> = ref('')
const messageError: Ref<string> = ref('')

const successMessage: Ref<string> = ref('')
const errorMessage: Ref<string> = ref('')

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

function sendContactForm() {
  let isValid = true;

  const fields = [
    {value: firstName, error: firstNameError},
    {value: lastName, error: lastNameError},
    {value: email, error: emailError},
    {value: phoneNumber, error: phoneNumberError},
    {value: message, error: messageError}
  ];

  fields.forEach(field => {
    if (!field.value.value) {
      field.error.value = 'Feld darf nicht leer sein';
      isValid = false;
    } else {
      field.error.value = '';
    }
  })

  if (!isValid) {
    nextTick(() => {
      const firstErrorElement = document.querySelector('.input-wrapper .error');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    });
    return;
  }

  const templateParams = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    message: message.value
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        successMessage.value = 'Formular erfolgreich gesendet!';
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        phoneNumber.value = '';
        message.value = '';
      })
      .catch(error => {
        errorMessage.value = 'Formular konnte nicht gesendet werden';
        console.error('Fehler beim Senden der E-Mail:', error);
      })
}


const hero = ref(null);
const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)
const textSection = ref(null)

const contactOptions: Ref<ContactOption[]> = ref([
  {
    href: 'mailto:hallo@freier-redner-tom.at',
    text: 'hallo@freier-redner-tom.at',
    image: 'ic_email.png',
    alt: 'email'
  },
  {
    href: 'tel:+436701234567',
    text: '+436701234567',
    image: 'ic_telephone.png',
    alt: 'telefon'
  }
])

const services: ComputedRef<Service[]> = computed(() => [
  {
    image: 'img_tom3-min.webp',
    alt: translations.value.weddingHeader,
    heading: translations.value.weddingHeader,
    text: translations.value.homeServiceCardText1,
    pathName: 'wedding'
  },
  {
    image: 'img_tom4-min.webp',
    alt: translations.value.childCelebrationHeader,
    heading: translations.value.childCelebrationHeader,
    text: translations.value.homeServiceCardText2,
    pathName: 'child-celebration'
  },
  {
    image: 'img_tom7-min.webp',
    alt: translations.value.funeralHeader,
    heading: translations.value.funeralHeader,
    text: translations.value.homeServiceCardText3,
    pathName: 'celebrations'
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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  if (hero.value) observer.observe(hero.value);
  if (image1.value) observer.observe(image1.value);
  if (image2.value) observer.observe(image2.value);
  if (image3.value) observer.observe(image3.value);
  if (textSection.value) observer.observe(textSection.value)
})
</script>

<style scoped>

.parallax-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.background {
  background-image: url('../assets/images/img_tom1-min.webp');
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

header {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {

    color: rgba(255, 255, 255, 0.9);
    text-shadow: 2px 2px 10px rgba(0, 128, 0, 0.7); /* Grüner Schatten */
    margin: 0 auto 20px auto;
    width: 80%;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Leichteres Overlay */
  z-index: 0;
}


.text-header {
  position: relative;
  z-index: 1 ;
  text-align: center;
  width: 70%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* Mehr Abstand zwischen der Überschrift und diesem Textblock */
  border-radius: 4px;
}

.extra-margin {
  margin-bottom: 16px;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .button-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    & > * {
      width: 100%;
    }
  }
}

.hero-images {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    cursor: crosshair;

    img {
      object-fit: cover;
      width: 100%;
      height: auto;
      border-radius: 20px;
      transition: all 400ms ease-in-out;
    }

    &:hover img {
      transform: scale(1.2) rotate(5deg);
    }
  }
}

.text-section {
  background-color: var(--beige);
  width: 100%;
  padding: 60px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .text-wrapper {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      text-align: justify;
    }


    .top-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bottom-section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .left, .right {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}

.slider-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  margin: 0 auto;
}

.faq-section {
  display: flex;
  flex-direction: column;
  gap: 16px;


  .accordion-flex {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .contact-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .option {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-flex {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

  }
}

@media (min-width: 740px) {

  .hero {
    .button-section {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: flex-start;
      gap: 16px;

      & > * {
        width: 170px;
      }
    }
  }

  .hero-images {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 280px;

    .image-wrapper {
      .image1 {
        height: 250px;
        width: 300px;
        align-self: center;
      }

      .image2 {
        height: 142px;
        width: 142px;
        align-self: flex-end;
      }

      .image3 {
        height: 200px;
        width: 142px;
        align-self: flex-start;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 620px;
      gap: 16px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }


  .slider-section {
    width: 640px;
  }

  .contact-section {
    .contact-options {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 80px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .input-flex {
        display: flex;
        flex-direction: row;

        & > * {
          width: 100%
        }
      }

      .button-wrapper {
        align-self: center;
      }
    }
  }
}


@media (min-width: 1200px) {
  .hero-images {
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 350px;

    .image-wrapper {
      .image1 {
        height: 280px;
        width: 400px;
      }

      .image2 {
        height: 180px;
        width: 170px;
      }

      .image3 {
        height: 200px;
        width: 170px;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 860px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }

  .slider-section {
    width: 970px;
  }
}

@media (min-width: 1920px) {
  .hero-images {
    display: flex;
    flex-direction: row;
    gap: 16px;
    height: 400px;

    .image-wrapper {
      .image1 {
        height: 350px;
        width: 600px;
      }

      .image2 {
        height: 250px;
        width: 250px;
      }

      .image3 {
        height: 250px;
        width: 250px;
      }
    }
  }

  .text-section {
    .text-wrapper {
      width: 1260px;

      .bottom-section {
        display: flex;
        flex-direction: row;
        gap: 32px;

        .left, .right {
          width: 50%;
        }
      }
    }
  }
}

.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 600ms ease-in-out;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
