import type { Meta, StoryObj } from '@storybook/vue3'
import SweepGlow from './sweep-glow.vue'

// 配置 Meta 数据
const meta = {
  title: 'Components/SweepGlow',
  component: SweepGlow,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '文本内容',
    },
  },
} satisfies Meta<typeof SweepGlow>

export default meta
type Story = StoryObj<typeof meta>

// 基础文本示例
export const Default: Story = {
  args: {
    text: '扫光文本效果',
  },
}

// 自定义元素示例
export const CustomElement: Story = {
  render: () => ({
    components: { SweepGlow },
    template: `
      <SweepGlow>
        <div style="width: 200px; height: 100px; background: #333; border-radius: 8px;">
          <img src="https://placeholder.com/200x100" alt="示例图片" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </SweepGlow>
    `,
  }),
}

// 按钮示例
export const Button: Story = {
  render: () => ({
    components: { SweepGlow },
    template: `
      <SweepGlow>
        <button style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px;">
          点击按钮
        </button>
      </SweepGlow>
    `,
  }),
}

// 卡片示例
export const Card: Story = {
  render: () => ({
    components: { SweepGlow },
    template: `
      <SweepGlow>
        <div style="padding: 16px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3>卡片标题</h3>
          <p>这是一个带有扫光效果的卡片示例</p>
        </div>
      </SweepGlow>
    `,
  }),
}

// 组合使用示例
export const Combined: Story = {
  render: () => ({
    components: { SweepGlow },
    template: `
      <div style="display: flex; gap: 16px; flex-direction: column;">
        <SweepGlow text="文本扫光效果" />
        <SweepGlow>
          <button style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px;">
            按钮扫光效果
          </button>
        </SweepGlow>
        <SweepGlow>
          <div style="padding: 16px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3>卡片扫光效果</h3>
            <p>这是一个组合示例</p>
          </div>
        </SweepGlow>
      </div>
    `,
  }),
}
