var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./lib/index.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
				library: 'vue-socket-io',
				libraryTarget: 'umd'
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
