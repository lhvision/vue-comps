<script setup lang="ts">
import { getPrefixCls } from '../_utils/withInstall'

defineOptions({
  name: 'LineClamp',
})
const {
  text,
  inputId,
  webkitLineClamp = 1,
  btnClassName,
  textClassName,
  dataUpText,
  dataDownText,
  isShowBtn,
} = defineProps<{
  text?: string
  /**
   * CSS 状态切换, input type="checkbox"
   * label 标签 与 input 关联值
   * 同个页面不能存在相同的 inputId 不然会点击另一个关闭态的按钮会关闭已展开的
   */
  inputId: string
  /**
   * 指定显示行数，为了支持 transition-height，这里使用的 height 来模拟 -webkit-line-clamp
   * @defaultValue 1
   */
  webkitLineClamp?: number
  btnClassName?: string
  textClassName?: string
  /**
   * 是否显示展开按钮，需要配合 dataUpText，dataDownText 使用
   */
  isShowBtn?: boolean
  dataUpText?: string
  dataDownText?: string
}>()

const prefixCls = getPrefixCls('line-clamp')
</script>

<template>
  <div
    class="w-full flex overflow-hidden"
    :class="prefixCls"
  >
    <input
      :id="inputId"
      type="checkbox"
      class="hidden"
      :class="`${prefixCls}-input`"
    >
    <div
      class="relative overflow-hidden text-ellipsis text-justify leading-6 transition-height duration-300"
      :class="[
        `${prefixCls}-text`,
        textClassName,
      ]"
      :style="{
        // '-webkit-line-clamp': webkitLineClamp,
        height: `${webkitLineClamp * 1.5}rem`,
      }"
    >
      <label
        class="relative float-right clear-both ml-1 h-6 w-fit cursor-pointer leading-6"
        :class="[
          `${prefixCls}${isShowBtn ? '-text' : ''}-btn`,
          isShowBtn && 'ml-4 px-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700',
          btnClassName,
        ]"
        :for="inputId"
        :data-up-text="dataUpText"
        :data-down-text="dataDownText"
      />
      {{ text }}
    </div>
  </div>
</template>
