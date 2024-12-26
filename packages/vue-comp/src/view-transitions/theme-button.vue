<script setup lang="ts">
import { inject } from 'vue'

defineOptions({
  name: 'ThemeButton',
})

const toggleTheme = inject<(e: MouseEvent) => Promise<void>>('toggle-theme')
const isDark = inject<boolean>('is-dark')
</script>

<template>
  <button
    class="h-6 w-12 flex flex-shrink-0 cursor-pointer items-center border-1 border-gray-200 rounded-3 bg-gray-100 px-[2px] transition-border-color view-transition-theme-button dark:border-gray-700 dark:bg-gray-800"
    :aria-checked="isDark"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    @click="toggleTheme"
  >
    <span class="grid h-5 w-5 place-items-center rounded-1/2 bg-[var(--light-dark-bg)] transition-transform duration-300 dark:(translate-x-[22px] rotate-360)">
      <span class="i-tabler-sun-high inline-block h-4 w-4 dark:i-tabler-moon-stars" />
    </span>
  </button>
</template>
