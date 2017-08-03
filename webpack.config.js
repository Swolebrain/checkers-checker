const webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        path: __dirname+'\\dist',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0']
            }
        }]
    }
}
