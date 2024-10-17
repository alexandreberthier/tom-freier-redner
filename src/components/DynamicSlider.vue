<template>
  <div class="slider-container" ref="container">
    <div class="slider" ref="slider">
      <slot></slot>
      <slot></slot>
    </div>
    <button class="control left" @click="prevSlide">‹</button>
    <button class="control right" @click="nextSlide">›</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';

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

const minSlideWidth = 300; // Mindestbreite jeder Slide

// Berechne die Anzahl der Slides, die basierend auf der Containerbreite Platz finden
const calculateSlidesToShow = () => {
  if (!container.value) return 1;
  const containerWidth = container.value.clientWidth;
  return Math.floor(containerWidth / minSlideWidth);
};

// Funktion, um erste und letzte Slides zu klonen
const cloneSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);

  slider.value.appendChild(firstSlide);
  slider.value.insertBefore(lastSlide, slides[0]);
};

// Berechne die Slide-Breite basierend auf der Anzahl der sichtbaren Slides
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

    // Setze den Slider auf die erste echte Slide
    slider.value.style.transform = `translateX(-${slideWidth}px)`;
    currentIndex.value = 1;
  }
};

const nextSlide = () => {
  if (isTransitioning || !slider.value) return;
  isTransitioning = true;
  currentIndex.value++;
  updateSliderPosition();
};

const prevSlide = () => {
  if (isTransitioning || !slider.value) return;
  isTransitioning = true;
  currentIndex.value--;
  updateSliderPosition();
};

const updateSliderPosition = () => {
  if (slider.value) {
    slider.value.style.transition = 'transform 0.5s ease-in-out';
    slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
  }
};

// Behandle das Ende der Transition, um den unendlichen Effekt zu erzeugen
const handleTransitionEnd = () => {
  if (!slider.value) return;
  const totalSlides = slideCount - 2; // Abzüglich der geklonten Slides

  if (currentIndex.value >= totalSlides + 1) {
    // Wenn am Ende angekommen (bei der geklonten ersten Slide), springe zurück zur echten ersten Slide
    slider.value.style.transition = 'none';
    currentIndex.value = 1;
    slider.value.style.transform = `translateX(-${slideWidth}px)`;
  } else if (currentIndex.value <= 0) {
    // Wenn am Anfang angekommen (bei der geklonten letzten Slide), springe zur echten letzten Slide
    slider.value.style.transition = 'none';
    currentIndex.value = totalSlides;
    slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
  }
  isTransitioning = false;
};

const handleTouchStart = (event: TouchEvent) => {
  if (!slider.value) return;
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
    cloneSlides(); // Klone die ersten und letzten Slides für den unendlichen Effekt
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

watchEffect(() => {
  if (autoSlideTimer) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
});


</script>

<style scoped>

.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.slider > * {
  flex-shrink: 0;
}

.control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 10;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}
</style>