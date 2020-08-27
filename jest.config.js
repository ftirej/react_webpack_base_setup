const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  rootDir: path.join(__dirname, '/'),
  roots: [path.join(__dirname, '/src')],
  displayName: 'jest',
};
