<script setup lang="ts">
import { initThemeListener, setTheme, startViewTransition } from '@lhvision/helpers'
import { onMounted, provide, ref } from 'vue'

defineOptions({
  name: 'ThemeContainer',
})

const isDark = ref(false)

async function toggleTheme({ clientX: x, clientY: y }: MouseEvent) {
  document.documentElement.style.setProperty('--x', `${x}px`)
  document.documentElement.style.setProperty('--y', `${y}px`)
  startViewTransition(() => {
    setTheme()
    isDark.value = !isDark.value
  })
}

onMounted(() => {
  initThemeListener((darkThemeMqMatches) => {
    if (isDark.value !== darkThemeMqMatches) {
      isDark.value = darkThemeMqMatches
      startViewTransition(() => setTheme(darkThemeMqMatches))
    }
  })
})

provide('toggle-theme', toggleTheme)
provide('is-dark', isDark)
</script>

<template>
  <slot />
</template>
