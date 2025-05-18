import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/server_app';
const baseTestDir = '<rootDir>/src/test';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `src/@log2.ts.adligo.org@slink/*.ts`
    ],
    testMatch:[
        `**/log2Trials.ts`
    ]
}

export default config;