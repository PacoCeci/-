module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules'],
};
