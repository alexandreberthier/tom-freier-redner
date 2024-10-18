<template>
  <div class="slider-container" ref="container">
    <div class="slider-wrapper" ref="wrapper">
      <div class="slider" ref="slider" @transitionend="handleTransitionEnd">
        <slot></slot>
      </div>
    </div>
    <div v-if="!allSlidesVisible && !hideControlsFrom" class="controls">
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
import {ref, onMounted, nextTick, onBeforeUnmount, computed} from 'vue';
import {windowUtils} from "@/utils/WindowWidthUtils";
import {getImage} from "@/utils/ImageUtils";

// Props
const props = defineProps<{
  autoSlide: boolean;
  hideControls?: number
}>();

const {windowWidth} = windowUtils()

const hideControlsFrom = computed(() => {
  if (props.hideControls) {
    return windowWidth.value >= props.hideControls;
  }
  return false;
});


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

const cloneSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const firstSlideClone = slides[0].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);

  slider.value.appendChild(firstSlideClone);
  slider.value.insertBefore(lastSlideClone, slides[0]);
}

const removeClonedSlides = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  if (slides.length > slideCount) {
    slider.value.removeChild(slides[slides.length - 1]);
    slider.value.removeChild(slides[0]);
  }
};

const updateSliderDimensions = () => {
  if (!wrapper.value || !slider.value || !container.value) return;

  const containerWidth = container.value.clientWidth;
  const slides = Array.from(slider.value.children) as HTMLElement[];
  slideCount = slides.length;

  slideWidth = slides[0].clientWidth;
  const visibleSlides = Math.floor(containerWidth / (slideWidth + 20));

  allSlidesVisible.value = slideCount <= visibleSlides + 2;

  if (allSlidesVisible.value) {
    removeClonedSlides();
  } else {
    cloneSlides();
  }

  // Set slider width
  slider.value.style.width = `${(slideWidth + 20) * slideCount}px`;


  currentIndex.value = Math.min(currentIndex.value, slideCount - 2);

  updateSliderPosition();
}

const nextSlide = () => {
  if (isTransitioning || !slider.value || allSlidesVisible.value) return;
  isTransitioning = true;
  currentIndex.value++;
  updateSliderPosition();
};

const prevSlide = () => {
  if (isTransitioning || !slider.value || allSlidesVisible.value) return;
  isTransitioning = true;
  currentIndex.value--;
  updateSliderPosition();
};

const updateSliderPosition = () => {
  if (!slider.value) return;
  slider.value.style.transition = 'transform 0.9s ease-in-out';
  slider.value.style.transform = `translateX(-${(currentIndex.value * (slideWidth + 20))}px)`; // Include gap
};

const handleTransitionEnd = () => {
  if (!slider.value) return;

  const slides = Array.from(slider.value.children) as HTMLElement[];
  const realSlideCount = slides.length - 2;

  if (currentIndex.value >= realSlideCount + 1) {
    slider.value.style.transition = 'none';
    currentIndex.value = 1;
    slider.value.style.transform = `translateX(-${slideWidth + 20}px)`;
  } else if (currentIndex.value <= 0) {
    slider.value.style.transition = 'none';
    currentIndex.value = realSlideCount;
    slider.value.style.transform = `translateX(-${(slideWidth + 20) * realSlideCount}px)`;
  }

  isTransitioning = false;
};

const startAutoSlide = () => {
  if (autoSlideTimer) return;
  autoSlideTimer = setInterval(() => {
    nextSlide();
  }, 5000);
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

    if (props.autoSlide) {
      startAutoSlide();
    }
  })
})


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
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.9s ease-in-out;
  gap: 20px;
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
