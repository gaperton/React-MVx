module.exports = {
    entry : "./src/index",

    output : {
        filename      : './dist/index.js',
        library       : "ReactMVC",
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
        }
    }
};