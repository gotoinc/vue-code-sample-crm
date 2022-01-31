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
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.vue",
    "<rootDir>/src/views/**/*.vue",
    "<rootDir>/src/layouts/**/*.vue",
    "<rootDir>/src/App.vue",
  ],
};
