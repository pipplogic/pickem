module.exports = {
  plugins: ["react", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "airbnb",
    "prettier"
  ],
  env: {
    browser: true
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js"] }]
  }
};
