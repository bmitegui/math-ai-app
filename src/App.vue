<script setup>
import Sidebar from './components/Sidebar.vue';
import MathRender from './components/MathRender.vue';
import { ArrowUp, Sparkles, Menu, Loader2 } from 'lucide-vue-next';
import { ref, nextTick } from 'vue';
import { generarEjercicios } from './services/mathService';

const nivel = ref(3);
const cantidad = ref(2);
const materia = ref('Pre- Álgebra');

const sidebarOpen = ref(false);
const isLoading = ref(false);
const chatContainer = ref(null);

const chatHistory = ref([
  {
    id: 'intro',
    role: 'ai',
    textoIntro: 'Hola, soy tu asistente de Math AI. Selecciona la materia, nivel y cantidad abajo para generar ejercicios.',
    problemas: [] 
  }
]);

const pedirEjercicios = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    const respuestaApi = await generarEjercicios(materia.value, nivel.value, cantidad.value);
    
    chatHistory.value.push(respuestaApi);

    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }

  } catch (error) {
    console.error("Error al conectar con la API", error);
    alert("Hubo un error generando los ejercicios");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen w-screen bg-white overflow-hidden pt-4">
    
    <div v-show="sidebarOpen" class="h-full flex-shrink-0">
        <Sidebar @toggle="sidebarOpen = false" /> 
    </div>

    <div class="flex-1 flex flex-col h-full relative transition-all duration-300">
      
      <div class="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div class="flex items-center">
            <button 
                v-if="!sidebarOpen" 
                @click="sidebarOpen = true"
                class="p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                title="Mostrar menú"
            >
                <Menu class="w-6 h-6" />
            </button>
        </div>

        <div class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
          {{ materia }}, nivel {{ nivel }}, cantidad {{ cantidad }}
        </div>
      </div>

      <div ref="chatContainer" class="flex-1 overflow-y-auto p-8 bg-white scroll-smooth">
        
        <div v-if="chatHistory.length === 0" class="h-full flex flex-col items-center justify-center text-gray-400">
            <Sparkles class="w-12 h-12 mb-4 opacity-50" />
            <p>Configura los parámetros abajo y envía para comenzar.</p>
        </div>

        <div v-for="mensaje in chatHistory" :key="mensaje.id" class="max-w-3xl mx-auto flex gap-4 mb-8">
          
          <div class="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shrink-0 h-fit">
             <Sparkles class="w-4 h-4 text-gray-600" />
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 flex-1 text-gray-800 shadow-sm border border-gray-100">
            
            <p class="mb-6 text-gray-700 font-medium">
              {{ mensaje.textoIntro }}
            </p>

            <div v-for="problema in mensaje.problemas" :key="problema.id" class="mb-8 last:mb-0 border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <h3 class="font-bold text-gray-900 mb-1">{{ problema.titulo }}</h3>
              <p class="mb-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">{{ problema.tema }}</p>
              <p class="mb-4 text-gray-700">{{ problema.enunciado }}</p>
              
              <div class="text-xl font-serif text-center py-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <MathRender :formula="problema.formula" :displayMode="true" />
              </div>
            </div>

          </div>
        </div>

        <div v-if="isLoading" class="max-w-3xl mx-auto flex gap-4 mb-8">
            <div class="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shrink-0">
                <Sparkles class="w-4 h-4 text-gray-600 animate-pulse" />
            </div>
            <div class="bg-gray-50 rounded-xl p-4 flex items-center gap-2 text-gray-500 text-sm">
                <Loader2 class="w-4 h-4 animate-spin" />
                <span>Generando ejercicios...</span>
            </div>
        </div>

      </div>

      <div class="p-6 shrink-0 bg-white z-10">
        <div class="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-wrap items-center gap-6">
          
          <div class="flex flex-col gap-1">
            <label class="text-xs text-gray-500 font-medium ml-1">Materia</label>
            <select v-model="materia" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-40 p-2.5">
              <option>Pre- Álgebra</option>
              <option>Cálculo</option>
              <option>Geometría</option>
            </select>
          </div>

          <div class="flex flex-col gap-1 flex-1 min-w-[150px]">
             <div class="flex justify-between text-xs text-gray-500 font-medium px-1">
               <span>Nivel</span>
               <span>{{ nivel }}</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="h-2 w-full bg-gray-100 rounded-full relative flex items-center">
                  <input type="range" v-model="nivel" min="1" max="5" class="w-full absolute z-20 opacity-0 cursor-pointer h-full" />
                  <div class="absolute h-2 bg-gray-900 rounded-full" :style="{ width: (nivel * 20) + '%' }"></div>
                  <div class="absolute h-4 w-10 bg-gray-500 rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2 border-2 border-white shadow" :style="{ left: (nivel * 20) + '%' }"></div>
               </div>
             </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs text-gray-500 font-medium ml-1">Cantidad</label>
            <select v-model="cantidad" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-24 p-2.5">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <button 
            @click="pedirEjercicios" 
            :disabled="isLoading"
            :class="{'opacity-50 cursor-not-allowed': isLoading, 'hover:bg-gray-50': !isLoading}"
            class="ml-auto w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-colors"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 text-purple-600 animate-spin" />
            <ArrowUp v-else class="w-5 h-5 text-gray-600" />
          </button>

        </div>
        <div class="text-center mt-2 text-xs text-gray-400">
           estudiante@figma.com
        </div>
      </div>

    </div>
  </div>
</template>