/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./game.html", "./src/*.ts"],
  plugins: [
    require('@catppuccin/tailwindcss')({
      prefix: "ctp",
      defaultFlavour: "mocha"
    })
  ],
  theme: {
    extend: {},
  },

}

