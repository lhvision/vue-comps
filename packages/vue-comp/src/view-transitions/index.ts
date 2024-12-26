import { withInstall } from '../_utils/withInstall'
import _ThemeButton from './theme-button.vue'
import _ThemeContainer from './theme-container.vue'

const ThemeContainer = withInstall(_ThemeContainer)
const ThemeButton = withInstall(_ThemeButton)

// type ThemeContainerInstance = InstanceType<typeof ThemeContainer>

export { ThemeButton, ThemeContainer }
