import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildUMD() {
  await build({
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    mode: 'production',
    configFile: false,
    build: {
      target: 'modules',
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, '../src/lhvision-vue.ts'),
        name: 'LhvisionVue',
        formats: ['umd'],
        fileName: format => `lhvision-vue.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'], // 外部依赖
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [vue()],
  })
}

buildUMD()
