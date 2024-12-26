import type { App, Plugin } from 'vue'
import type { GlobalConfigOptions } from './_utils/withInstall'
import LineClamp from './line-clamp'
import SweepGlow from './sweep-glow'
import TaskBar from './task-bar'
import { ThemeButton, ThemeContainer } from './view-transitions'

const components: Record<string, Plugin> = {
  LineClamp,
  TaskBar,
  SweepGlow,
  ThemeButton,
  ThemeContainer,
}

function install(app: App, options?: GlobalConfigOptions) {
  for (const key of Object.keys(components)) {
    app.use(components[key], options)
  }
}

export default {
  install,
  ...components,
}
