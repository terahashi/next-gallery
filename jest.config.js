//⬇︎Next.js公式ページからペーストしました。
//https://nextjs.org/docs/app/guides/testing/jest

const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  //⬇︎テスト環境が準備できたあとに、このjest.setup.jsを実行して、toBeInTheDocument()などを使用可能にする。
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
