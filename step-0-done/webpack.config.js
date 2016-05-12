var webpack = require('webpack'),
    path = require('path');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./app/app.js']
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        preLoaders: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "app"),
            loader: "eslint-loader"
          }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
              test: /\.html$/,
              loader: "html"
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};
