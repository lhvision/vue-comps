import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  preflights: [
    {
      getCSS: () => `
        @layer lhv-base, lhv-transitions;
        *,
        :before,
        :after {
          box-sizing: border-box;
        }
        /* grid-template-rows: masonry; */
        /* css 函数需要 chrome 123 以上 --light-dark-bg: light-dark(#fff, #000); */
        :root {
          color-scheme: light dark;

          --light-dark-bg: light-dark(#fff, #000);
          --light-dark-text: light-dark(#000, #fff);
        }
        :root.dark {
          color-scheme: dark;
        }
        /* chrome 129, 支持 width 和 height 的 auto 等其他关键字过渡动画 */
        @supports (interpolate-size: allow-keywords) {
          :root {
            interpolate-size: allow-keywords;
          }
        }
        @layer lhv-base {
          @media (prefers-reduced-motion: reduce) {
            *,
            ::before,
            ::after {
              animation-delay: -1ms !important;
              animation-duration: 1ms !important;
              animation-iteration-count: 1 !important;
              background-attachment: initial !important;
              scroll-behavior: auto !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          }
        }
      `,
    },
  ],
})
