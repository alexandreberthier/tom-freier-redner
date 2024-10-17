<template>
  <div class="slider-container" ref="container">
    <div role="slider" class="slider" ref="slider">
      <slot></slot>
    </div>
    <div class="controls">
      <div @click="prevSlide" class="button" role="button">
        <div class="icon-wrapper">
          <img :src="getImage('ic_chevron_white_left.png')" alt="chevron links">
        </div>
      </div>
      <div @click="nextSlide" class="button" role="button">
        <div class="icon-wrapper">
          <img :src="getImage('ic_chevron_white_right.png')" alt="chevron rechts">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref} from 'vue';
import {getImage} from "@/utils/ImageUtils";

const slider = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const currentIndex = ref(1);
let slideWidth = 0;
let slideCount = 0;
let isTransitioning = false;
let autoSlideTimer: number | null = null;
let startX = 0;
let currentX = 0;
let isSwiping = false;
let deltaX = 0;

// Funktion zur dynamischen Anpassung der Mindestbreite der Slides basierend auf dem Viewport
const getDynamicSlideWidth = () => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth >= 1920) {
    return 1100;
  } else if (viewportWidth >= 1200) {
    return 800;
  } else if (viewportWidth >= 740) {
    return 600;
  } else {
    return 300;
  }
};

// Berechne die Anzahl der sichtbaren Slides
const calculateSlidesToShow = () => {
  if (!container.value) return 1;
  const containerWidth = container.value.clientWidth;
  const minSlideWidth = getDynamicSlideWidth();
  return Math.floor(containerWidth / minSlideWidth);
};

// Klone die ersten und letzten Slides für den unendlichen Effekt
const cloneSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const slidesToShow = calculateSlidesToShow();

  for (let i = 0; i < slidesToShow; i++) {
    const firstSlideClone = slides[i].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1 - i].cloneNode(true);

    slider.value.appendChild(firstSlideClone);
    slider.value.insertBefore(lastSlideClone, slides[0]);
  }
};

// Update der Slider-Dimensionen
const updateSliderDimensions = () => {
  if (slider.value && container.value) {
    const slidesToShow = calculateSlidesToShow();
    slideWidth = container.value.clientWidth / slidesToShow;

    const slides = Array.from(slider.value.children) as HTMLElement[];
    slideCount = slides.length;

    slider.value.style.width = `${slides.length * slideWidth}px`;

    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
    });

    slider.value.style.transform = `translateX(-${slideWidth * slidesToShow}px)`;
    currentIndex.value = slidesToShow;
  }
};

// Behandle das Wechseln zur nächsten Slide
const nextSlide = () => {
  if (isTransitioning || !slider.value) return;
  isTransitioning = true;
  currentIndex.value++;
  updateSliderPosition();
};

// Behandle das Wechseln zur vorherigen Slide
const prevSlide = () => {
  if (isTransitioning || !slider.value) return;
  isTransitioning = true;
  currentIndex.value--;
  updateSliderPosition();
};

// Aktualisiere die Slider-Position
const updateSliderPosition = () => {
  if (slider.value) {
    slider.value.style.transition = 'transform 0.5s ease-in-out';
    slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
  }
};

// Behandle das Ende der Transition, um den unendlichen Effekt zu erzeugen
const handleTransitionEnd = () => {
  if (!slider.value) return;
  const slidesToShow = calculateSlidesToShow();
  const totalSlides = slideCount - slidesToShow * 2;

  if (currentIndex.value >= totalSlides + slidesToShow) {
    slider.value.style.transition = 'none';
    currentIndex.value = slidesToShow;
    slider.value.style.transform = `translateX(-${slideWidth * slidesToShow}px)`;
  } else if (currentIndex.value <= 0) {
    slider.value.style.transition = 'none';
    currentIndex.value = totalSlides;
    slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
  }
  // Transition beendet, Steuerung freigeben
  isTransitioning = false;
};

// Touch-Events für mobiles Swiping
const handleTouchStart = (event: TouchEvent) => {
  if (isTransitioning || !slider.value) return;
  startX = event.touches[0].clientX;
  currentX = startX;
  deltaX = 0;
  isSwiping = true;
  slider.value.style.transition = 'none';
};

const handleTouchMove = (event: TouchEvent) => {
  if (!isSwiping || !slider.value) return;
  currentX = event.touches[0].clientX;
  deltaX = currentX - startX;
  const translateX = (currentIndex.value * slideWidth) - deltaX;
  slider.value.style.transform = `translateX(-${translateX}px)`;
};

const handleTouchEnd = () => {
  if (!isSwiping || !slider.value) return;
  isSwiping = false;

  if (Math.abs(deltaX) > slideWidth * 0.2) {
    if (deltaX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  } else {
    updateSliderPosition();
  }

  slider.value.style.transition = 'transform 0.5s ease-in-out';
};

// Auto-Slide-Handling
const startAutoSlide = () => {
  if (!autoSlideTimer) {
    autoSlideTimer = setInterval(() => {
      nextSlide();
    }, 3000);
  }
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

onMounted(() => {
  nextTick(() => {
    cloneSlides();
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);

    slider.value?.addEventListener('transitionend', handleTransitionEnd);
    container.value?.addEventListener('touchstart', handleTouchStart);
    container.value?.addEventListener('touchmove', handleTouchMove);
    container.value?.addEventListener('touchend', handleTouchEnd);

    startAutoSlide();
  });
});

onBeforeUnmount(() => {
  stopAutoSlide();
  window.removeEventListener('resize', updateSliderDimensions);

  container.value?.removeEventListener('touchstart', handleTouchStart);
  container.value?.removeEventListener('touchmove', handleTouchMove);
  container.value?.removeEventListener('touchend', handleTouchEnd);
});

</script>


<style scoped>

.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.slider > * {
  flex-shrink: 0;
}

.controls {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 50px;

  .button {
    background-color: var(--beige);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    cursor: pointer;

    .icon-wrapper {
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

</style>