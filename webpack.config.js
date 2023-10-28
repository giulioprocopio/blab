const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = function (env, argv) {
    return {
        mode: argv.mode,
        entry: path.resolve(__dirname, 'src/index.ts'),
        output: {
            filename: 'index.js',
            library: 'BLab',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    use: ['babel-loader', 'ts-loader'],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            alias: {
                '@root': path.resolve(__dirname, 'src')
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'ts', 'tsx'],
                exclude: 'node_modules'
            })
        ]
    };
};
