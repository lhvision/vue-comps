import type { Meta, StoryObj } from '@storybook/vue3'
import TaskBar from './task-bar.vue'

const meta = {
  title: 'Components/TaskBar',
  component: TaskBar,
  tags: ['autodocs'],
  argTypes: {
    menuList: {
      description: '任务列表',
      control: 'object',
    },
  },
} satisfies Meta<typeof TaskBar>

export default meta
type Story = StoryObj<typeof meta>

// 创建一些示例图标
const demoTasks = [
  {
    name: 'Chrome',
    index: 0,
  },
  {
    name: 'VSCode',
    index: 1,
  },
  {
    name: 'Finder',
    index: 2,
  },
  {
    name: 'Terminal',
    index: 3,
  },
  {
    name: 'Settings',
    index: 4,
  },
]

export const Default: Story = {
  args: {
    menuList: demoTasks,
    direction: 'horizontal',
  },
}

// 无图标版本
export const LeftVertical: Story = {
  args: {
    menuList: demoTasks.map(({ name, index }) => ({ name, index })),
    direction: 'left-vertical',
  },
}

// 更多图标版本
export const RightVertical: Story = {
  args: {
    menuList: [...demoTasks, ...demoTasks.map(task => ({ ...task, name: `${task.name} 2` }))],
    direction: 'right-vertical',
  },
}
