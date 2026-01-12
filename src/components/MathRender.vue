<script setup>
import katex from 'katex';
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, required: true }
});

const partes = computed(() => {
  if (!props.text) return [];
  return props.text.split('$');
});

const renderMath = (formula) => {
  try {
    const formulaLimpia = formula.replace(/\\\\/g, '\\');

    return katex.renderToString(formulaLimpia, {
      throwOnError: false,
      displayMode: false 
    });
  } catch (e) {
    return formula;
  }
};
</script>

<template>
  <span class="leading-relaxed text-lg text-gray-800">
    <span v-for="(parte, index) in partes" :key="index + parte">
      
      <span v-if="index % 2 === 0">
        {{ parte }}
      </span>

      <span v-else v-html="renderMath(parte)" class="text-purple-800 font-serif mx-1"></span>
    
    </span>
  </span>
</template>