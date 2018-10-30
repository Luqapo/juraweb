var path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports={
    entry:"./js/index.jsx",
    output: { filename: "out.js", path: path.resolve(__dirname, '../public/js') },
    watch: true,
    mode: 'development',
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2','react']
                }
            }
        }]
    }
    // plugins: [
    //     new BrowserSyncPlugin({
    //         // browse to http://localhost:3000/ during development,
    //         // ./public directory is being served
    //         host: 'localhost',
    //         port: 3000,
    //         server: { baseDir: ["../public/"] }
    //     })
    // ]
}