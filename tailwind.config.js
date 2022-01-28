module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        '18': '18rem',
        '7': '7rem',
      },
      spacing: {
        'table-size': '528px',
      },
      gridTemplateColumns: {
        'sidebar': '288px 1fr',
      },
      colors: {
        'dark-jungle-green': '#141A26',
        'space-cadet': '#232659',
        'space-cadet-darken': '#222D42',
        'white-darken': '#EFF1F6',
        'light-silver': "#D7D7D7",
        'cultured': "#F7F7F7"
      }
    },
  },
  plugins: [],
}
