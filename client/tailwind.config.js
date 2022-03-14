module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        opensans: ["Open Sans", "ui-sans-serif", "system-ui"],
        raleway: ["Raleway", "ui-serif", "Georgia"],
        righteous: ["Righteous", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        darkSlateGray: "#2B4141",
        pacificBlue: "#0EB1D2",
        flurescentBlue: "#34E4EA",
        opal: "#8AB9B5",
      },
    },
  },
  plugins: [],
};
