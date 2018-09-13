module.exports = {
    plugins: [
        '@babel/plugin-proposal-export-default-from',
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        '@babel/plugin-proposal-class-properties',
    ],
    presets: ['@babel/preset-env'],
}
