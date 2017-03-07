const path = require('path');

module.exports = {
    entry: path.resolve('src', 'index.js'),
    output: {
        filename: 'mini-component.min.js',
        library: 'Mini',
        libraryTarget: 'var',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
        ]
    }
}
