module.exports = {
  extends: [
    "plugin:vue/recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
  ],

  rules: {
    "prettier-vue/prettier": [
      "error",
      {
        printWidth: 80,
        singleQuote: false,
        semi: true,
        trailingComma: "es5",
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: "avoid",
      },
    ],
  },
};