module.exports = {
  collectCoverageFrom: ['{plugins,core}/**/.+.test.js'],
  modulePathIgnorePatterns: ['/__fixtures__/'],
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
};
