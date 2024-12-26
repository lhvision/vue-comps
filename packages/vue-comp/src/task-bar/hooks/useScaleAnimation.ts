import { computed, ref, type Ref } from 'vue'

/**
 * 基础缩放曲线函数
 * @param x 相对位置 (0-1)
 * @returns 缩放值
 */
function calculateBaseCurve(x: number): number {
  if (x < 0 || x > 1)
    return 0
  return Math.sin(Math.PI * x)
}

/**
 * 创建缩放曲线函数
 * @param range 影响范围
 * @param mouseX 鼠标X坐标
 * @param minScale 最小缩放值
 * @param maxScale 最大缩放值
 */
function createScaleCurve(range: number, mouseX: number, minScale: number, maxScale: number) {
  return function (itemX: number) {
    const startX = mouseX - range / 2
    const endX = mouseX + range / 2

    if (itemX < startX || itemX > endX)
      return minScale

    const scaleRange = maxScale - minScale
    return calculateBaseCurve((itemX - startX) / range) * scaleRange + minScale
  }
}

/**
 * 获取元素中心点坐标
 */
function getItemCenter(item: HTMLElement) {
  const rect = item.getBoundingClientRect()
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  }
}

export function useScaleAnimation(
  menuRef: Ref<HTMLElement | undefined>,
  options: {
    animationRange: number
    minScale: number
    maxScale: number
    isHorizontal: boolean
  },
) {
  const menuItems = computed(() => (menuRef.value?.children || []) as HTMLElement[])
  const animationFrameId = ref<number>()

  /**
   * 更新所有项目的缩放
   */
  function updateItemsScale(scaleCurve: (x: number) => number) {
    if (!menuItems.value.length)
      return

    if (animationFrameId.value)
      cancelAnimationFrame(animationFrameId.value)

    animationFrameId.value = requestAnimationFrame(() => {
      for (const item of menuItems.value) {
        const center = getItemCenter(item)
        // 根据方向选择使用 x 或 y 坐标
        const pos = options.isHorizontal ? center.x : center.y
        item.style.setProperty('--scale', `${scaleCurve(pos)}`)
      }
    })
  }

  /**
   * 鼠标移动事件处理
   */
  function handleMouseMove(e: MouseEvent) {
    const { animationRange, minScale, maxScale } = options
    // 根据方向选择使用鼠标的 x 或 y 坐标
    const mousePos = options.isHorizontal ? e.clientX : e.clientY
    const scaleCurve = createScaleCurve(animationRange, mousePos, minScale, maxScale)
    updateItemsScale(scaleCurve)
  }

  /**
   * 鼠标离开事件处理
   */
  function handleMouseLeave() {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
      animationFrameId.value = undefined
    }
    updateItemsScale(() => options.minScale)
  }

  return {
    handleMouseMove,
    handleMouseLeave,
  }
}
