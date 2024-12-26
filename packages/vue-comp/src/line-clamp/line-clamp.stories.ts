import type { Meta, StoryObj } from '@storybook/vue3'
import LineClamp from './line-clamp.vue'

const meta = {
  title: 'Components/LineClamp',
  component: LineClamp,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    webkitLineClamp: { control: 'number' },
    inputId: { control: 'text' },
  },
} satisfies Meta<typeof LineClamp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: '这是一段很长的文本，用来测试多行省略的效果。这是一段很长的文本，用来测试多行省略的效果。这是一段很长的文本，用来测试多行省略的效果。这是一段很长的文本，用来测试多行省略的效果。',
    inputId: 'line-clamp-1',
    webkitLineClamp: 2,
    dataUpText: '展开',
    dataDownText: '收起',
  },
}

export const SingleLine: Story = {
  args: {
    text: '单行省略文本测试',
    inputId: 'line-clamp-2',
    webkitLineClamp: 1,
  },
}
