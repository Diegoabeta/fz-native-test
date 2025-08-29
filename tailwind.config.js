/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#166D6B",
        dark: "#4E4E4E",
        surface: "#CCE6E3",
        red: "#F00000",
        pink: "#FFD0D0",
        white: "FFFFFF",
        "light-green": "#A2D033",
        "off-white": "#F9FBFB",
        "bg-green": "#EDF4D8",
        "grey-1": "#707070",
        "grey-2": "#9DA6B2",
      },
    },
  },
  plugins: [],
};
