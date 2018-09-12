module.exports = {
    collectCoverageFrom: [
        'provider.js',
        '!decorators/index.js',
        'decorators/*.js',
    ],
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js'],
    testRegex: 'tests/.*\\.test\\.js$',
    coverageReporters: ['html'],
}
