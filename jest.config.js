module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    roots: ['src/'],
    setupFiles: ['./setupTests.js'],
    collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
};
