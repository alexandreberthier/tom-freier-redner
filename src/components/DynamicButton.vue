<template>
  <component
      :is="hasLink ? 'router-link' : 'div'"
      :to="hasLink ? linkOptions : null"
      :class="['button', buttonType]"
      v-bind="!hasLink ? { role: 'button' } : {}"
  >
    <p>{{ buttonText }}</p>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type {ButtonType} from "@/models/Enums";

const props = defineProps<{
  buttonText: string
  buttonType: ButtonType
  hasLink?: boolean
  pathName?: string
  hash?: string

}>()

const linkOptions = computed(() =>
    props.pathName
        ? { name: props.pathName, ...(props.hash && { hash: props.hash }) }
        : {}
)

</script>

<style scoped>

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 24px;
  cursor: pointer;
  transition: all 150ms ease;

  p {
    font-weight: 600;
  }

  &.primary {
    background-color: var(--dark-green);
    color: white;

    p {
      color: white;
    }

    &:hover {
      background-color: var(--darker-green)
    }
  }

  &.secondary {
    background-color: var(--white);
    color: var(--dark-green);
    border: 1px solid var(--dark-green);

    &:hover {
      background-color: lightgray;
    }
  }
}

</style>
