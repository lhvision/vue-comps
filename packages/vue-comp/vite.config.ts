/// <reference types="vitest" />
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      // mode: 'per-module',
    }),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      // 确保生成更清晰的类型文件
      cleanVueFileName: true,
      // rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // 确保每个组件都是独立的 chunk
        preserveModules: true,
        // 设置输出目录结构
        preserveModulesRoot: 'src',
        // 确保生成简洁的文件名
        entryFileNames: '[name].js',
        // 将 CSS 提取到单独的文件
        // assetFileNames: '[name][extname]',
      },
    },
  },
})
