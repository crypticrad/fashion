import type { ThemeConfig } from 'antd';

/**
 * RAD antd theme preset.
 *
 * Single source of truth for how antd components (currently just `Rate`)
 * map onto the project's design language: black-on-white brand, Satoshi
 * type, gold rating stars (#FFC633). Consumed via `ConfigProvider` in
 * `AntdRegistry`, so antd's CSS-in-JS output stays aligned with the
 * Tailwind/typography.css tokens instead of antd's blue defaults.
 *
 * Keep token values in sync with `app/globals.css` / `app/typography.css`.
 */
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#000000',
    fontFamily: "'Satoshi', sans-serif"
  },
  components: {
    Rate: {
      starColor: '#FFC633',
      starBg: 'rgba(0, 0, 0, 0.15)',
      starSize: 18
    },
    Input: {
      controlHeightLG: 50,
      colorBgContainer: '#f0f0f0',
      hoverBg: '#f0f0f0',
      activeBg: '#f0f0f0',
      colorBorder: 'transparent',
      activeBorderColor: 'transparent',
      hoverBorderColor: 'transparent',
      borderRadiusLG: 12,
      paddingBlockLG: 15,
      paddingInlineLG: 18,
      fontSizeLG: 15,
      colorText: 'rgb(0, 0, 0)',
      activeShadow: 'none'
    },
    Button: {
      borderRadiusLG: 62,
      controlHeightLG: 52,
      paddingInlineLG: 16,
      fontSizeLG: 15,
      fontWeight: 700,
      primaryShadow: 'none',
      defaultShadow: 'none',
      defaultBorderColor: 'rgba(0, 0, 0, 0.10)',
      defaultColor: 'rgb(0, 0, 0)'
    }
  }
};
