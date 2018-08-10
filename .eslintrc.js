module.exports = {
  parser: "babel-eslint",
  plugins: ["react"],
  extends: [
    "plugin:react/recommended",
    "standard",
    "standard-jsx"
  ],
  env: {
    browser: true
  },
};
