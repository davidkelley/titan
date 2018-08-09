module.exports = {
  collectCoverageFrom: ['{plugins,core}/**/.+.test.js'],
  modulePathIgnorePatterns: ['/__fixtures__/'],
  roots: ['<rootDir>/core', '<rootDir>/plugins'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
};
