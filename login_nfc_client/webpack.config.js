/**
 * Created by andreyna on 3/26/2017.
 */
const path = require('path');
const webpack = require('webpack');
const PATH_BASE = path.resolve(__dirname);

const devConfig = {
    entry: path.resolve(PATH_BASE, 'src/kcl_core.js'),
    output: {
        path: path.resolve(PATH_BASE, 'dist/js'),
        filename: 'kcl.min.js',
        library: 'kcl',
        pathinfo: false
    },
    debug: true,
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=50000'
            }, // inline base64 URLs for <=10k images, direct URLs for the rest
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.lib\.js$/,
                loader: 'script-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.BannerPlugin(legacy,{raw: true}),
        //new LiveReloadPlugin({appendScriptTag: true}),
        new webpack.DefinePlugin({__DEBUG__: true})
    ]
}

module.exports = devConfig;