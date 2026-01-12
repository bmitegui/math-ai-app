<script setup>
import katex from 'katex';
import { computed } from 'vue';

const props = defineProps({
  formula: String,
  displayMode: { type: Boolean, default: false }
});

const html = computed(() => {
  try {
    return katex.renderToString(props.formula, {
      throwOnError: false,
      displayMode: props.displayMode
    });
  } catch (e) {
    return props.formula;
  }
});
</script>

<template>
  <span v-html="html"></span>
</template>