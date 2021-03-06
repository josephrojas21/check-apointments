const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        singleSpaEntry: './src/singleSpaEntry.js',
        store: './src/store/store.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'amd',
        library: 'reactApp'
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/app1/',
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                 use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                 use: ['style-loader', 'scss-loader']
            }
        ],
    },

    mode: 'development',
    plugins: [
        new Dotenv(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'public/index.html') },
			{ from: path.resolve(__dirname, 'public/assets/img/Logo2.jpg') },
		])
    ],
    devtool: 'eval-source-map',
    // devtool: 'none',

};
