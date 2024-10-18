<template>
  <div class="slider-container" ref="container">
    <div class="slider-wrapper" ref="wrapper">
      <div class="slider" ref="slider" @transitionend="handleTransitionEnd">
        <slot></slot>
      </div>
    </div>
    <div v-if="!allSlidesVisible" class="controls">
      <button @click="prevSlide" class="control-btn">Prev</button>
      <button @click="nextSlide" class="control-btn">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';

// Props
const props = defineProps<{
  autoSlide: boolean;
}>();

// Refs
const slider = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const currentIndex = ref(1);
let autoSlideTimer: number | null = null;
let slideWidth = 0;
let slideCount = 0;
let isTransitioning = false;
const allSlidesVisible = ref(false);

// Clone slides for infinite scrolling
const cloneSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const firstSlideClone = slides[0].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);

  slider.value.appendChild(firstSlideClone);
  slider.value.insertBefore(lastSlideClone, slides[0]);
};

// Remove clones when resizing if all slides are visible
const removeClonedSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  if (slides.length > slideCount) {
    slider.value.removeChild(slides[slides.length - 1]); // Remove last clone
    slider.value.removeChild(slides[0]); // Remove first clone
  }
};

// Calculate visible slides and update slide dimensions
const updateSliderDimensions = () => {
  if (!wrapper.value || !slider.value || !container.value) return;

  const containerWidth = container.value.clientWidth;
  const slides = Array.from(slider.value.children) as HTMLElement[];
  slideCount = slides.length;

  // Dynamically calculate the slide width based on visible area
  slideWidth = slides[0].clientWidth;
  const visibleSlides = Math.floor(containerWidth / (slideWidth + 20)); // 20px gap

  allSlidesVisible.value = slideCount <= visibleSlides + 2; // +2 because of cloned slides

  // Remove clones if all slides are visible
  if (allSlidesVisible.value) {
    removeClonedSlides();
  } else {
    cloneSlides();
  }

  // Set slider width
  slider.value.style.width = `${(slideWidth + 20) * slideCount}px`; // Include gap

  // Recalculate the current index based on the new dimensions
  currentIndex.value = Math.min(currentIndex.value, slideCount - 2);

  // Reposition the slider after resizing
  updateSliderPosition();
};

// Move to the next slide
const nextSlide = () => {
  if (isTransitioning || !slider.value || allSlidesVisible.value) return;
  isTransitioning = true;
  currentIndex.value++;
  updateSliderPosition();
};

// Move to the previous slide
const prevSlide = () => {
  if (isTransitioning || !slider.value || allSlidesVisible.value) return;
  isTransitioning = true;
  currentIndex.value--;
  updateSliderPosition();
};

// Update slider position with smooth transition
const updateSliderPosition = () => {
  if (!slider.value) return;
  slider.value.style.transition = 'transform 0.5s ease-in-out';
  slider.value.style.transform = `translateX(-${(currentIndex.value * (slideWidth + 20))}px)`; // Include gap
};

// Handle transition end for infinite effect
const handleTransitionEnd = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const realSlideCount = slides.length - 2; // Subtract the two cloned slides

  if (currentIndex.value >= realSlideCount + 1) {
    slider.value.style.transition = 'none';
    currentIndex.value = 1;
    slider.value.style.transform = `translateX(-${slideWidth + 20}px)`; // Include gap
  } else if (currentIndex.value <= 0) {
    slider.value.style.transition = 'none';
    currentIndex.value = realSlideCount;
    slider.value.style.transform = `translateX(-${(slideWidth + 20) * realSlideCount}px)`; // Include gap
  }

  isTransitioning = false;
};

// Auto slide functionality
const startAutoSlide = () => {
  if (autoSlideTimer) return;
  autoSlideTimer = setInterval(() => {
    nextSlide();
  }, 3000); // Adjust slide interval here
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

// Mounted hook
onMounted(() => {
  nextTick(() => {
    cloneSlides();
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);

    if (props.autoSlide) {
      startAutoSlide();
    }
  });
});

// Cleanup before unmounting
onBeforeUnmount(() => {
  stopAutoSlide();
  window.removeEventListener('resize', updateSliderDimensions);
});

</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  gap: 20px; /* 20px gap between slides */
}

.controls {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

.control-btn {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
