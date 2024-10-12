<template>
  <router-link :to="{name: service.pathName}">
    <div class="card-wrapper">
      <div class="image-wrapper">
        <img :src="getImage(service.image)" :alt="service.alt">
      </div>
      <div class="text-wrapper">
        <h3>{{ service.heading }}</h3>
        <p>{{ service.text }}</p>
      </div>
      <DynamicButton
          :has-link="true"
          :path-name="service.pathName"
          button-text="Mehr erfahren"
          :button-type="ButtonType.Primary"
      />
    </div>
  </router-link>
</template>

<script setup lang="ts">


import type {Service} from "@/models/PropInterfaces";
import {ButtonType} from "@/models/Enums";
import {getImage} from "@/utils/ImageUtils";
import DynamicButton from "@/components/DynamicButton.vue";

defineProps<{
  service: Service
}>()
</script>

<style scoped>

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 300px;
  box-sizing: border-box;
  padding: 20px 14px;
  border: 1px solid var(--dark-green);
  border-radius: 20px;
  cursor: pointer;
  height: inherit;

  &:hover .image-wrapper img {
    transform: scale(1.1);
  }

  .image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 200px;
    border-radius: 14px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 14px;
      transition: transform 400ms ease-in-out;
    }
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

</style>