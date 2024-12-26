<script setup lang="ts">
import type { MenuItem, TaskBarProps } from './types'
import { computed, ref } from 'vue'
import { getPrefixCls } from '../_utils/withInstall'
import { useScaleAnimation } from './hooks/useScaleAnimation'

defineOptions({
  name: 'TaskBar',
})

const {
  menuList,
  animationRange = 200,
  maxScale = 1.8,
  minScale = 1,
  itemWidth = 32,
  gapWidth = 8,
  direction = 'horizontal',
  isTooltip,
  handleMenuClick,
} = defineProps<TaskBarProps>()

const prefixCls = getPrefixCls('task-bar')
const menuRef = ref<HTMLElement>()
const currentDirection = ref(direction)

const isHorizontal = computed(() => currentDirection.value === 'horizontal')

const { handleMouseMove, handleMouseLeave } = useScaleAnimation(menuRef, {
  animationRange,
  minScale,
  maxScale,
  isHorizontal: isHorizontal.value,
})

const menuListData = computed<MenuItem[]>(() => {
  return menuList.map((item) => {
    if (item.icon)
      return item
    return {
      ...item,
      icon: item.name.charAt(0),
      bgColor: `hsl(${item.name.length * 20},50%,70%)`,
    }
  })
})
</script>

<template>
  <div class="justify-items-center">
    <div
      ref="menuRef"
      class="flex items-center rounded bg-gray-100 backdrop-blur"
      :class="isHorizontal ? 'flex-row px-2 py-1 h-10 w-fit' : 'flex-col h-fit w-10 px-1 py-2'"
      :style="{
        '--item-width': `${itemWidth}px`,
        '--gap-width': `${gapWidth}px`,
      }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <template v-for="task in menuListData" :key="task.index">
        <div
          class="relative grid cursor-pointer place-content-center border border-gray-100 rounded border-solid"
          :class="[
            `${prefixCls}-item`,
            `${prefixCls}-item--${currentDirection}`,
            task?.bgColor && 'text-white',
            isTooltip && 'hover:(after:block)',
          ]"
          :style="{
            backgroundColor: task?.bgColor,
            fontSize: 'calc(var(--scale, 1) * 1rem)',
          }"
          :data-tooltip="task.desc || task.name"
          @click="handleMenuClick?.(task)"
        >
          {{ task.icon }}
        </div>
        <div class="last:hidden" :class="`${prefixCls}-gap`" />
      </template>
    </div>
  </div>
</template>
