/**
 * Created by andreyna on 3/26/2017.
 */
const path = require('path');
const webpack = require('webpack');
const PATH_BASE = path.resolve(__dirname);

const devConfig = {
    entry: path.resolve(PATH_BASE, 'src/kcl.js'),
    output: {
        path: path.resolve(PATH_BASE, 'dist/'),
        filename: 'kcl.min.js',
        library: 'kcl',
        libraryTarget: 'umd',
        pathinfo: false,
        publicPath: path.resolve(PATH_BASE, 'dist')
    },
    // externals: {
    //     'Configurator': JSON.stringify(require('kcl_config.json'))
    // },

    debug: true,
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader?limit=50000'
            // }, // inline base64 URLs for <=10k images, direct URLs for the rest
            {
                test: /\.html$/,
                loader: 'html?attrs=false'
            },
            {
                test: /\.lib\.js$/,
                loader: 'script-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.json$/,
                loader: 'external-loader'
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