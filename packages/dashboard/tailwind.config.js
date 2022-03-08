module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter"]
      },
      colors: {
        "dashboard-blue": "#0f62fe",
        "dashboard-red": "##ca3214",
        "dashboard-brown": "#7e868c",
        "dashboard-light": "#ecefed",
        "dashboard-lighter": "#f8f9fa"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
