const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require("tailwindcss/colors");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.coolGray,
        yellow: colors.amber,
        green: colors.emerald,
        blue: {
          light: '#85d7ff',
          DEFAULT: '#1fb6ff',
          dark: '#009eeb',
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        },
      },
      spacing: (() => {
        const map = {};
        for (let i = 0; i < 96; i += 1) {
          map[`${i}`] = `${6 * i}px`;
        }
        return map;
      })(),
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
