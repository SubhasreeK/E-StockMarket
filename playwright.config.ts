import {PlaywrightTestConfig} from '@playwright/test';

const config:PlaywrightTestConfig ={
    testMatch : /.*\.spec.ts/,
    testDir: 'lighthouse',
    timeout: 5 * 60 * 1000,
    use:{
        baseURL: process.env.CI_ENVIRONMENT_URL || 'http://localhost:3000',
        headless:true,
        channel:"chrome",
    }
}
export default config;