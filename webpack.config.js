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
        "react": "React",
        "react-dom": "ReactDOM",
        "type-r": "TypeR",
    }
};