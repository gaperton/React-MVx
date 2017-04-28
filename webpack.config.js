module.exports = {
    entry : "./lib/index",

    output : {
        filename      : './dist/index.js',
        library       : "ReactMVx",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    resolve : {
        extensions : [ '.ts', '.js' ]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },

    externals: {
        'react' : {
            commonjs  : 'react',
            commonjs2 : 'react',
            amd       : 'react',
            root      : 'React'
        },

        "type-r": {
            commonjs  : 'type-r',
            commonjs2 : 'type-r',
            amd       : 'type-r',
            root      : 'Nested'
        },

        'prop-types' : {
            commonjs  : 'prop-types',
            commonjs2 : 'prop-types',
            amd       : 'prop-types'
        },
    }
};