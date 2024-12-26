interface TaskBarItem extends Record<string, any> {
  name: string
  index: number
  /**
   * 显示图标，默认显示 name 的首字
   */
  icon?: string
  /**
   * tooltip 显示描述，默认显示 name
   */
  desc?: string
}

export type MenuItem = TaskBarItem & {
  bgColor?: string
}

export interface TaskBarProps {
  menuList: TaskBarItem[]
  /**
   * 动画影响范围
   * @defaultValue 200
   */
  animationRange?: number
  /**
   * 最大缩放比例
   * @defaultValue 1.8
   */
  maxScale?: number
  /**
   * 最小缩放比例
   * @defaultValue 1
   */
  minScale?: number
  /**
   * 图标宽高
   * @defaultValue 32px
   */
  itemWidth?: number
  /**
   * 间隙宽度
   * @defaultValue 8px
   */
  gapWidth?: number
  /**
   * 方向
   * @defaultValue horizontal
   */
  direction?: 'horizontal' | 'left-vertical' | 'right-vertical'
  /**
   * 是否开启 tooltip
   * @defaultValue true
   */
  isTooltip?: boolean
  /**
   * 点击菜单项回调
   */
  handleMenuClick?: (item: MenuItem) => void
}
