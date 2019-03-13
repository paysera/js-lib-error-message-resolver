const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    output: {
        library: 'PayseraErrorMessageResolver',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
        ],
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, '.'),
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
    },
    target: 'web',
    externals: [nodeExternals()],
};
