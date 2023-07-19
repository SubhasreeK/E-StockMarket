module.exports = {
    ci: {
        collect: {
            puppeteerScript: './src/__tests__/puppeteer.js',
            puppeteerLaunchOptions: {args: ['--allow-no-sandbox-job', '--allow-sandbox-debugging', '--no-sandbox', '--disable-gpu', '--disable-gpu-sandbox', '--display']}, //https://www.puppeteersharp.com/api/PuppeteerSharp.LaunchOptions.html
            numberOfRuns: 1,
            disableStorageReset: true,
            settings: {
                "output":["html"],
                "preset": "desktop",
                // Don't clear localStorage/IndexedDB/etc before loading the page.
                "disableStorageReset": true,
                // Wait up to 60s for the page to load
                "maxWaitForLoad": 60000,
                // Use applied throttling instead of simulated throttling
                "throttlingMethod": "devtools"
            },
            url: ['https://pptr.dev/']
        },
        upload: {
            target: 'temporary-public-storage',
            outputDir: './lhci_reports',
            reportFilenamePattern: 'LighthousePrefReport-%%DATETIME%%-report.%%EXTENSION%%'
            // token: '',
            // serverBaseUrl: ''
        },
        assert: {
            "assertions": {
                "categories:performance": ["error", {"minScore": 0.2}],
                "categories:accessibility": ["error", {"minScore": 0.8}],
                "categories:best-practices": ["error", {"minScore": 0.9}],
                "categories:seo": ["error", {"minScore": 0.8}]
            }
        },
    },
};