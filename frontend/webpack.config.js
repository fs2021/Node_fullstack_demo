const path = require('path');
    
module.exports = {
    resolve: {
        fallback: { "url": require.resolve("url/") }
    },
    entry: './src',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './')
    },
    devServer: {
        static: path.resolve(__dirname, './'),
        compress: true,
        port: 8080,
    },
    mode: 'development',
    
};
