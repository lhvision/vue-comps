<script setup lang="ts">
import { getPrefixCls } from '../_utils/withInstall'

defineOptions({
  name: 'SweepGlow',
})

const {
  text,
  bgColor = {
    start: 'rgba(255, 255, 255, 0)',
    middle: 'rgba(255, 255, 255, 0.7)',
    end: 'rgba(255, 255, 255, 0)',
  },
  angle = 45,
  maskUrl,
} = defineProps<{
  /**
   * 文本
   */
  text?: string
  /**
   * 渐变背景色
   */
  bgColor?: {
    start: string
    middle: string
    end: string
  }
  /**
   * 渐变角度
   */
  angle?: number
  /**
   * 对于不规则图片，传入图片路径，这将使用 maskUrl 进行遮罩
   */
  maskUrl?: string
}>()

const prefixCls = getPrefixCls('sweep-glow')
</script>

<template>
  <div
    class="flex"
    :style="{
      '--sweep-glow-color-start': bgColor.start,
      '--sweep-glow-color-middle': bgColor.middle,
      '--sweep-glow-color-end': bgColor.end,
      '--sweep-glow-angle': `${angle}deg`,
    }"
  >
    <div
      :class="[
        text ? 'bg-clip-text!' : 'flex-shrink-0 relative overflow-hidden',
        `${prefixCls}-${text ? 'text' : 'wrapper'}`,
      ]"
      :style="{
        mask: maskUrl ? `url(${maskUrl}) 0 0/100% no-repeat` : '',
      }"
    >
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>
