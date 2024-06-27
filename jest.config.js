module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
