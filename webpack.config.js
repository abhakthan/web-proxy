var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './main.js'
    },
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ],
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader',
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[contenthash].css'
        }),
        new UglifyJSPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true
        })],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            "/svc": {
                target: "https://globaldossier.uspto.gov",
                secure: true,
                changeOrigin: true
            }
        }
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};
