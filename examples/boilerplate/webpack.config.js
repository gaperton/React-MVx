var webpack = require( 'webpack' ),
    path = require('path'),
    Clean = require('clean-webpack-plugin');

var develop = process.argv.indexOf( '--env.develop' ) >= 0;
console.log( ( develop ? 'DEVELOP' : 'PRODUCTION' ) + ' build configuration.' );

var dist = path.join(__dirname, 'dist');

var plugins = [
    new webpack.optimize.OccurrenceOrderPlugin( true )
];

develop || plugins.push( new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
}));

develop || ( process.env.NODE_ENV = 'production' );

develop || plugins.push( new webpack.optimize.DedupePlugin() );

plugins.push( new webpack.optimize.CommonsChunkPlugin( {
    children  : true, // (use all children of the chunk)
    async     : true, // (create an async commons chunk)
    minChunks : 3 // (3 children must share the module before it's separated)
} ) );

develop && plugins.push( new WebpackNotifierPlugin( {alwaysNotify: true} ) );

develop && plugins.push( new Clean([dist]) );

var config = {
    entry  : {
        desktop : './js/index.jsx'
    },

    output : {
        // export itself to a global var
        path       : dist,
        publicPath : '/dist/',
        filename   : '[name].app.js',
        chunkFilename: '[name][hash].app.js'
    },

    devtool : 'source-map',

    resolve : {
        modulesDirectories : [ 'js/lib', 'node_modules', 'js' ],
        alias              : {
            'css'            : __dirname + '/css',
            'images'         : __dirname + '/images'
        }
    },

    plugins : plugins,

    module : {
        loaders : [
            // the optional 'runtime' transformer tells babel to require the runtime
            // instead of inlining it.
            {
                test    : /\.jsx?$/,
                exclude : /(node_modules|lib)/,
                loader  : 'babel'
            },
            {
                test   : /\.json$/,
                loader : "json-loader"
            },
            {
                test   : /\.less$/,
                loader : "style-loader!css-loader!less-loader"
            },
            { test : /\.css$/, loader : "style-loader!css-loader" },
            { test : /\.png$/, loader : "url-loader?limit=100000" },
            { test : /\.(jpg|gif)$/, loader : "file-loader" },
            { test     : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader : "url-loader?limit=10000&minetype=application/font-woff"
            },
            { test : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader : "file-loader" }
        ]
    }
};

module.exports = config;