module.exports = {
    testEnvironment:"jsdom",
    transform:{
        "^.+\\.(j|t)sx?$": "babel-jest",
    },
    snapshotSerializers: ['jest-emotion'],
    setupFilesAfterEnv: ['<rootDir>/src/enzyme.ts',"@testing-library/jest-dom"],
    collectCoverageFrom:[
        "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    ]
  };
