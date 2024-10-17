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

// Funktion zur dynamischen Anpassung der Mindestbreite der Slides basierend auf dem Viewport
const getDynamicSlideWidth = () => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth >= 1920) {
    return 1100; // 1100px ab 1920px Viewport
  } else if (viewportWidth >= 1200) {
    return 800; // 800px ab 1200px Viewport
  } else if (viewportWidth >= 740) {
    return 600; // 600px ab 740px Viewport
  } else {
    return 300; // 300px standardmäßig
  }
};

// Berechne die Anzahl der Slides, die basierend auf der Containerbreite Platz finden
const calculateSlidesToShow = () => {
  if (!container.value) return 1;
  const containerWidth = container.value.clientWidth;
  const minSlideWidth = getDynamicSlideWidth(); // Mindestbreite dynamisch anpassen
  return Math.floor(containerWidth / minSlideWidth);
};

// Funktion, um die ersten und letzten Slides so zu klonen, dass der Übergang flüssig bleibt
const cloneSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const slidesToShow = calculateSlidesToShow();

  // Klone die Anzahl der Slides, die der Anzahl der sichtbaren Slides entspricht
  for (let i = 0; i < slidesToShow; i++) {
    const firstSlideClone = slides[i].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1 - i].cloneNode(true);

    slider.value.appendChild(firstSlideClone);
    slider.value.insertBefore(lastSlideClone, slides[0]);
  }
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
    slider.value.style.transform = `translateX(-${slideWidth * slidesToShow}px)`;
    currentIndex.value = slidesToShow;
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
  const slidesToShow = calculateSlidesToShow();
  const totalSlides = slideCount - slidesToShow * 2; // Abzüglich der geklonten Slides

  if (currentIndex.value >= totalSlides + slidesToShow) {
    // Wenn am Ende angekommen (bei der geklonten ersten Slide), springe zurück zur echten ersten Slide
    slider.value.style.transition = 'none';
    currentIndex.value = slidesToShow;
    slider.value.style.transform = `translateX(-${slideWidth * slidesToShow}px)`;
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