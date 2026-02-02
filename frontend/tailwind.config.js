/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цвета бренда Travel+ (из брендбука)
        // Tangerine — ключевой цвет, яркий оранжевый
        tangerine: {
          DEFAULT: '#D97158',
          light: '#e8927a',
          dark: '#c25a42',
        },
        // Lemon — жёлтый, для деталей и акцентов
        lemon: {
          DEFAULT: '#FFD467',
          light: '#ffdf8a',
          dark: '#e6be4d',
        },
        // Gray — для текста (вместо чёрного)
        brandGray: {
          DEFAULT: '#71716F',
          light: '#8a8a87',
          dark: '#5a5a58',
        },
        // Aluminium — светло-серый для фонов, товары «Бизнес»/«Премиум»
        aluminium: '#E6E7E9',
        // Off-White — фоны
        offWhite: '#FAFAFA',
        // Для совместимости: primary = tangerine, accent = lemon
        primary: {
          DEFAULT: '#D97158',
          50: '#fdf4f2',
          100: '#fce8e4',
          200: '#f9d5ce',
          300: '#f4b5a9',
          400: '#ec8c7a',
          500: '#D97158',
          600: '#c25a42',
          700: '#a24833',
          800: '#863d2d',
          900: '#6f3628',
        },
        accent: {
          DEFAULT: '#FFD467',
          50: '#fffbeb',
          100: '#fff4c6',
          200: '#FFD467',
          300: '#e6be4d',
          400: '#c9a338',
          500: '#a6852e',
        },
      },
      fontFamily: {
        // Akony — только для «Трэвел+» в шапке (класс font-akony). Остальное — Golos Text.
        sans: ['Golos Text', 'system-ui', 'sans-serif'],
        display: ['Golos Text', 'system-ui', 'sans-serif'],
        akony: ['Akony', 'Akony Bold', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Соотношения из брендбука (база текст = 1rem)
        // Заголовок = текст × 2,23 | Подзаголовок = текст × 2 | Детали 2 = текст × 1,2
        'brand-header': ['2.23rem', { lineHeight: '1.2', fontWeight: '700' }],   // ~36px
        'brand-subheader': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],   // 32px
        'brand-text': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],          // 16px
        'brand-detail': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],        // детали 1 = текст
        'brand-detail-2': ['1.2rem', { lineHeight: '1.4', fontWeight: '500' }],    // детали 2
      },
      keyframes: {
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'modal-in': 'modal-in 0.25s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
