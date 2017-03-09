var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
