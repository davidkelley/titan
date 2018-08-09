module.exports = {
  reporters: ['default', 'jest-junit'],
  modulePathIgnorePatterns: ['/__fixtures__/'],
  roots: ['<rootDir>/core', '<rootDir>/plugins'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
};
