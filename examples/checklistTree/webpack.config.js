var webpack = require( 'webpack' );

module.exports = {
    entry  : './src/index.jsx',
    output : {
        // export itself to a global var
        path       : __dirname,
        publicPath : '/',
        filename   : 'app.js'
    },

    devtool : 'source-map',

    resolve : {
        modulesDirectories : [ 'node_modules', 'js', '' ]
    },

    module : {
        loaders : [
            {
                test    : /\.js$/,
                exclude : /(node_modules)/,
                loader  : 'babel?optional[]=runtime&stage=0'
            },

            {
                test    : /\.jsx$/,
                loader  : 'babel?optional[]=runtime&stage=0'
            },

            { test : /\.css$/, loader : "style-loader!css-loader" }
        ]
    }
};
