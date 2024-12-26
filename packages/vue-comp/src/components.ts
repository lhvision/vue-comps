/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck

declare module 'vue' {
  export interface GlobalComponents {
    LhvLineClamp: typeof import('@lhvision/vue-comp')['LineClamp']
    LhvTaskBar: typeof import('@lhvision/vue-comp')['TaskBar']
    LhvSweepGlow: typeof import('@lhvision/vue-comp')['SweepGlow']
    LhvThemeContainer: typeof import('@lhvision/vue-comp')['ThemeContainer']
    LhvThemeButton: typeof import('@lhvision/vue-comp')['ThemeButton']
  }
}

export {}
