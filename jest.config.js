module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
  },
  testMatch: ['!**/__fixtures__/**', '**/__tests__/**/*.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage/'],
  restoreMocks: true,
  moduleDirectories: ['node_modules/', 'src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
  },
  maxWorkers: 2,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/__tests__/**',
    '!**/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      line: 50,
      statements: 50,
    },
  },
  coverageDirectory: './coverage/',
  maxConcurrency: 1,
  notify: true,
  notifyMode: 'failure',
  bail: true,
};
