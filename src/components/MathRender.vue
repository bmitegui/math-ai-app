<script setup>
import katex from 'katex';
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, required: true }
});

// Usamos una Expresión Regular para separar el texto.
// Esto captura correctamente bloques $...$ y $$...$$ sin romper el array con elementos vacíos.
const partes = computed(() => {
  if (!props.text) return [];
  
  // Regex explicación:
  // (\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)
  // 1. Busca contenido entre doble signo $$ ... $$ (prioridad)
  // 2. O busca contenido entre un solo signo $ ... $
  // El paréntesis de captura hace que el split incluya la fórmula en el array resultante.
  return props.text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
});

// Función simple para detectar si una parte es una fórmula (empieza con $)
const esMatematica = (texto) => {
  return texto && (texto.startsWith('$') || texto.startsWith('$$'));
};

const renderMath = (formulaRaw) => {
  try {
    // 1. Limpieza de delimitadores ($ o $$) para obtener solo la fórmula pura
    let formula = formulaRaw.replace(/^\${1,2}|\${1,2}$/g, '');

    // 2. Limpieza agresiva de backslashes dobles
    // Las respuestas de IA a veces traen "\\cdot" (doble barra) en lugar de "\cdot"
    // O traen "\\\\" para saltos de línea.
    // Esto convierte las dobles barras en simples para que Katex las entienda.
    formula = formula.replace(/\\\\/g, '\\');

    // 3. Renderizar
    return katex.renderToString(formula, {
      throwOnError: false,
      displayMode: formulaRaw.startsWith('$$'), // Si usaba $$, activamos modo display
      output: 'html'
    });
  } catch (e) {
    console.error("Error renderizando math:", e);
    return formulaRaw;
  }
};
</script>

<template>
  <span class="leading-relaxed text-lg text-gray-800 break-words">
    <span v-for="(parte, index) in partes" :key="index + parte">
      
      <span 
        v-if="esMatematica(parte)" 
        v-html="renderMath(parte)" 
        class="text-purple-800 font-serif mx-1 inline-block"
      ></span>

      <span v-else>
        {{ parte }}
      </span>
    
    </span>
  </span>
</template>