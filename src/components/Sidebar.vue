<script setup>
import { Search, Menu } from 'lucide-vue-next';

const emit = defineEmits(['toggle']);
</script>

<template>
  <div class="w-64 h-full bg-white border-r border-gray-200 flex flex-col p-4 transition-all duration-300">
    <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold text-lg">
      <button @click="$emit('toggle')" class="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
        <Menu class="w-6 h-6" />
      </button>
      <span>MATH <span class="text-purple-600">AI</span></span>
    </div>

    <div class="relative mb-6">
      <Search class="w-4 h-4 absolute left-3 top-3 text-gray-400" />
      <input 
        type="text" 
        placeholder="Search" 
        class="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
      >
    </div>

    <div class="flex-1 overflow-y-auto space-y-4">
      <div class="text-xs font-semibold text-gray-400 uppercase">Chats</div>
      
      <div class="space-y-2">
        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          Pre - Álgebra - Nivel 3
        </button>
        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          Geometría - Nivel 2
        </button>
        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          Pre - Cálculo - Nivel 3
        </button>
        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          Conteo y probabilidad - Nivel 1
        </button>
        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          Teoría de números - Nivel 4
        </button>
      </div>
    </div>

    <div class="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
      <img src="https://ui-avatars.com/api/?name=Estudiante&background=0D8ABC&color=fff" class="w-8 h-8 rounded-full" alt="User">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">estudiante@figma.com</p>
      </div>
    </div>
  </div>
</template>