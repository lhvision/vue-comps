import type { Meta, StoryObj } from '@storybook/vue3'
import ThemeButton from './theme-button.vue'
import Theme from './theme-container.vue'

const meta = {
  title: 'Components/Theme',
  component: Theme,
  tags: ['autodocs'],
} satisfies Meta<typeof Theme>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { ThemeButton, Theme },
    setup: () => ({ args }),
    template: '<Theme><ThemeButton /></Theme>',
  }),
}
