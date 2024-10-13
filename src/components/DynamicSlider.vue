<template>
  <div class="wrapper">
    <div class="outer">
      <div ref="sliderWrapper" class="slider-wrapper">
        <div ref="slidesWrapper" class="slides-wrapper" @scroll="handleScroll">
          <slot></slot>
        </div>
      </div>
      <div  v-if="props.arrowNavigation" role="button" @click="prevSlide" class="icon-wrapper arrow-left">
        <img :src="getImage('ic_chevron_left.png')" alt="links">
      </div>
      <div  v-if="props.arrowNavigation" role="button" @click="nextSlide" class="icon-wrapper arrow-right">
        <img :src="getImage('ic_chevron_right.png')" alt="rechts">
      </div>

      <div v-if="!props.arrowNavigation && showNavigation" class="navigation-dot-wrapper">
        <div v-for="(dot, index) in Math.min(slideCount, navigationDotsCount)" :key="index" class="dot"
             :class="{ active: index === activeSlideIndex }" @click="goToSlide(index)"></div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {computed, type ComputedRef, nextTick, onMounted, onUnmounted, ref, watch, type Ref} from "vue";
import {defineProps} from "vue";
import {getImage} from "@/utils/ImageUtils";

interface Props {
  autoRotate?: boolean,
  rotateInterval?: number
  arrowNavigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoRotate: false,
  rotateInterval: 6000,
  arrowNavigation: false
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

function prevSlide() {
  stopAutoRotate();
  if (activeSlideIndex.value > 0) {
    goToSlide(activeSlideIndex.value - 1);
  }
  restartAutoRotate();
}

function nextSlide() {
  stopAutoRotate();
  if (activeSlideIndex.value < slideCount.value - visibleSlideCount.value) {
    goToSlide(activeSlideIndex.value + 1);
  }
  restartAutoRotate();
}

function restartAutoRotate() {
  if (props.autoRotate) {
    setTimeout(() => {
      startAutoRotate();
    }, 5000);
  }
}

function handleScroll() {
  stopAutoRotate();
  const scrollLeft = slidesWrapper.value?.scrollLeft ?? 0;
  activeSlideIndex.value = Math.round(scrollLeft / (singleSlideWidth.value + gapSize));
  restartAutoRotate();
}


const showNavigation: ComputedRef<boolean> = computed(() => {
  return combinedSlidesWidth.value > sliderWidth.value;
});

const navigationDotsCount: ComputedRef<number> = computed(() => {
  const dotsCount = slideCount.value - visibleSlideCount.value + 1;
  return dotsCount > 0 ? dotsCount : 0;
})

function goToSlide(index: number) {
  if (slidesWrapper.value && sliderWidth.value) {
    const scrollPosition = index * (singleSlideWidth.value + gapSize)
        - (sliderWidth.value - singleSlideWidth.value) / 2;

    slidesWrapper.value.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
    activeSlideIndex.value = index;
  }
}


function updateSliderDimensions() {
  nextTick(() => {
    if (sliderWrapper.value && slidesWrapper.value && slidesWrapper.value.children.length > 0) {
      slideCount.value = Array.from(slidesWrapper.value.children).length;
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
  });
}


function observeMutations() {
  if (slidesWrapper.value) {
    observer = new MutationObserver(() => {
      updateSliderDimensions();
    });
    observer.observe(slidesWrapper.value, {childList: true, subtree: true});
  }
}

function startAutoRotate() {
  if (props.autoRotate) {
    stopAutoRotate();
    autoRotateInterval = setInterval(() => {
      const nextSlideIndex = (activeSlideIndex.value + 1) % slideCount.value;
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
  stopAutoRotate();
  if (observer) {
    observer.disconnect();
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
  flex-direction: column;
  gap: 30px;
}

.arrow-left {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-right{
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
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

.slides-wrapper > * {
  flex: 0 0 auto;
  scroll-snap-align: center;
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




.icon-wrapper {
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;

  img {
    width: 20px;
    height: 20px;
  }
}


@media (min-width: 740px) {
  .slides-wrapper {
    height: 100%;
  }
}
</style>
