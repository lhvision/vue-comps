/** @type { import('@storybook/vue3').Preview } */
import 'virtual:uno.css'
import '../src/index.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
