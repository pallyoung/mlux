var webpack = require('webpack');


module.exports = {
    entry: {
        'mlux': './src/index.js',
        'mlux.min': './src/index.js'
    },
    output: {
        path: 'dist',
        filename: '[name].js',
        library: 'Mlux',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: 'node_modules/',
                loader: 'babel-loader'
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            test:'mlux.min',
            comments:false
        })
    ]
}