<template>
  <div class="wrapper">
    <div class="outer">
      <div ref="sliderWrapper" class="slider-wrapper">
        <div ref="slidesWrapper" class="slides-wrapper" @scroll="handleScroll">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-if="showNavigation" class="navigation-dot-wrapper">
      <div v-for="(dot, index) in Math.min(slideCount, navigationDotsCount)" :key="index" class="dot"
           :class="{ active: index === activeSlideIndex }" @click="goToSlide(index)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, type ComputedRef, nextTick, onMounted, onUnmounted, ref, watch, type Ref} from "vue";
import {defineProps} from "vue";

interface Props {
  autoRotate?: boolean,
  rotateInterval?: number
}


const props = withDefaults(defineProps<Props>(), {
  autoRotate: false,
  rotateInterval: 6000
})
const sliderWrapper: Ref<HTMLDivElement | null> = ref(null);
const slidesWrapper: Ref<HTMLDivElement | null> = ref(null);
const combinedSlidesWidth: Ref<number> = ref(0);
const slideCount: Ref<number> = ref(0);
const singleSlideWidth: Ref<number> = ref(0);
const singleSlideHeight: Ref<number> = ref(0);
const activeSlideIndex: Ref<number> = ref(0);
const sliderWidth: Ref<number> = ref(0);
const visibleSlideCount: Ref<number> = ref(0);
const gapSize = 20;
let observer: MutationObserver | null = null;
let autoRotateInterval: number | null = null;

const showNavigation: ComputedRef<boolean> = computed(() => {
  return combinedSlidesWidth.value > sliderWidth.value;
});

const navigationDotsCount: ComputedRef<number> = computed(() => {
  const dotsCount = slideCount.value - visibleSlideCount.value + 1;
  return dotsCount > 0 ? dotsCount : 0;
});

function goToSlide(index: number) {
  if (slidesWrapper.value) {
    slidesWrapper.value.scrollTo({
      left: index * (singleSlideWidth.value + gapSize),
      behavior: 'smooth',
    });
    activeSlideIndex.value = index;
  }
}

function handleScroll() {
  const scrollLeft = slidesWrapper.value?.scrollLeft ?? 0; // Sicherstellen, dass slidesWrapper nicht null ist
  activeSlideIndex.value = Math.round(scrollLeft / (singleSlideWidth.value + gapSize));
}

function updateSliderDimensions() {
  nextTick(() => {
    if (sliderWrapper.value && slidesWrapper.value) {
      slideCount.value = Array.from(slidesWrapper.value.children).length;
      if (slideCount.value > 0) {
        singleSlideWidth.value = slidesWrapper.value.children[0].clientWidth;
        singleSlideHeight.value = slidesWrapper.value.children[0].clientHeight;
        combinedSlidesWidth.value =
            singleSlideWidth.value * slideCount.value + gapSize * (slideCount.value - 1);
        sliderWidth.value = sliderWrapper.value.clientWidth;
        visibleSlideCount.value = Math.floor(
            (sliderWidth.value + gapSize) / (singleSlideWidth.value + gapSize)
        );
        sliderWrapper.value.style.minHeight = `${singleSlideHeight.value}px`;
      }
    }
  });
}

function observeMutations() {
  if (slidesWrapper.value) {
    observer = new MutationObserver(() => {
      updateSliderDimensions(); // Aktualisiere die Slider-Dimensionen bei Änderungen
    });
    observer.observe(slidesWrapper.value, {childList: true, subtree: true});
  }
}

function startAutoRotate() {
  if (props.autoRotate) {
    autoRotateInterval = setInterval(() => {
      const nextSlideIndex = (activeSlideIndex.value + 1) % slideCount.value; // Nächster Index, rotierend
      goToSlide(nextSlideIndex);
    }, props.rotateInterval);
  }
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }
}

onMounted(() => {
  nextTick(() => {
    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);
    observeMutations();

    if (props.autoRotate) {
      startAutoRotate();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSliderDimensions);
  stopAutoRotate(); // Stoppe Auto-Rotate beim Demontieren
  if (observer) {
    observer.disconnect(); // Optional-Chaining für den Observer
  }
});

watch(() => props.autoRotate, (newVal) => {
  if (newVal) {
    startAutoRotate();
  } else {
    stopAutoRotate();
  }
});

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.outer {
  position: relative;
  display: flex;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.slides-wrapper {
  display: flex;
  gap: 30px;
  transition: transform 0.5s ease;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  align-items: flex-end;
  height: 100%;
  box-sizing: border-box;
  padding-top: 16px;
}

.slides-wrapper::-webkit-scrollbar {
  display: none;
}

.slides-wrapper > * {
  flex: 0 0 auto;
}

.navigation-dot-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--beige);
  cursor: pointer;
  margin: 0 5px;
  transition: all 500ms ease;
}

.dot.active {
  background-color: var(--dark-green)
}


@media (min-width: 740px) {
  .slides-wrapper {
    height: 100%;
  }
}
</style>
