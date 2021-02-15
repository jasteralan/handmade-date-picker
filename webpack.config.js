const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    const mode = process.env.NODE_ENV || 'development';

    const base = {
        mode,
        devtool: "source-map",
        resolve: {
            extensions: ['.js', '.jsx']
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        entry: {
            demo: [
                './demo'
            ],
        },
        output : {
            path: path.join(__dirname, 'dist'),
            filename: '[name].[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx|js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                    }]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },

        optimization : {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
            },
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[chunkhash].css',
                chunkFilename: '[id].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),
        ]
    }

    if (mode === 'development') {

        // for more information, see https://webpack.js.org/configuration/dev-server
        base.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            host: '0.0.0.0',
            port: 8000,
            open: true,
            hot: true,
            compress: true,
            stats: 'errors-only',
            overlay: true,
            useLocalIp: true
        };
    }

    return base;
}