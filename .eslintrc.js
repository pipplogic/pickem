module.exports = {
  parser: "babel-eslint",
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier"
  ],
  env: {
    browser: true
  },
  rules: {
    // Allow jsx in .js files
    // "react/jsx-filename-extension": ["error", { extensions: [".js"] }],
    // Turn off jsx formatting rule managed by prettier
    "react/jsx-one-expression-per-line": "off"
  }
};
