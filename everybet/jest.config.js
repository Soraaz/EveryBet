module.exports = {
    verbose:true,
    preset: "react-native",
    testMatch: ["**/tests/**/*.js"],
    testPathIgnorePatterns:["/node_modules/", "./tests/setupTest.*"],
    transformIgnorePatterns: [
        "node_modules/(?!react-native|tcomb-form-native|react-navigation|react-clone-referenced-element)",
    ],
    transform: {
        "^.+\\.(js)$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
    collectCoverage: true,
    coverageReporters: ["lcov"],
    coverageDirectory: "./generated/report",
    collectCoverageFrom: [
        "**/src/**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/services/**",
        "!**/src/common/templates/**"
    ],
    setupFilesAfterEnv: ["./tests/setupTest.js"],
};
