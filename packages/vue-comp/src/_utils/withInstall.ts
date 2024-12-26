import type { App, Component, Plugin } from 'vue'

// 全局配置相关常量
const COMPONENT_PREFIX = 'Lhv'
const CLASS_PREFIX = 'lhv'
const GLOBAL_CONFIG_NAME = '$lhv'

/** 全局配置选项类型 */
export interface GlobalConfigOptions {
  componentPrefix?: string
  classPrefix?: string
}

/** 组件安装类型 */
export type WithInstall<T> = T & Plugin & {
  name: string
}

/** 设置全局配置 */
export function setGlobalConfig(app: App, options?: GlobalConfigOptions): void {
  if (options?.classPrefix) {
    app.config.globalProperties[GLOBAL_CONFIG_NAME] = {
      ...app.config.globalProperties[GLOBAL_CONFIG_NAME],
      classPrefix: options.classPrefix,
    }
  }
}

/** 获取组件前缀 */
export function getComponentPrefix(options?: GlobalConfigOptions): string {
  return options?.componentPrefix ?? COMPONENT_PREFIX
}

/** 获取 CSS 类前缀 */
export function getPrefixCls(componentName?: string): string {
  const prefix = CLASS_PREFIX
  if (componentName) {
    return `${prefix}-${componentName}`
  }
  return prefix
}

/** 用于注册简单组件 */
export function withInstall<T extends Component>(component: T) {
  const comp = component as WithInstall<T>

  // 添加 install 方法
  comp.install = (app: App, options?: GlobalConfigOptions): void => {
    const prefix = getComponentPrefix(options)
    setGlobalConfig(app, options)

    // 注册组件，添加前缀
    app.component(`${prefix}${comp.name}`, comp)
  }

  return comp
}

/** 用于注册复杂组件 */
export function withInstallComplex<T extends Component>(main: T, components: Record<string, Component> = {}) {
  const comp = main as WithInstall<T>

  comp.install = (app: App, options?: GlobalConfigOptions): void => {
    const prefix = getComponentPrefix(options)
    setGlobalConfig(app, options)

    // 注册主组件
    app.component(`${prefix}${comp.name}`, comp)

    // 注册子组件
    Object.entries(components).forEach(([_, component]) => {
      app.component(`${prefix}${component.name}`, component)
    })
  }

  // 添加子组件引用
  Object.entries(components).forEach(([key, component]) => {
    (comp as any)[key] = component
  })

  return comp
}
