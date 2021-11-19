module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  verbose: true,
  setupFiles: ["<rootDir>/jest.init.js"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/materialize-css/dist/css/materialize.css",
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
