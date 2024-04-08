const { NxWebpackPlugin, composePlugins, withNx } = require('@nx/webpack');
const { NxReactWebpackPlugin, withReact } = require('@nx/react');
const { join } = require('path');
const { merge } = require('webpack-merge');

module.exports = {
    output: {
        path: join(__dirname, '../../dist/apps/gtech-industries'),
    },
    devServer: {
        port: 4200,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        new NxWebpackPlugin({
            tsConfig: './tsconfig.app.json',
            compiler: 'babel',
            main: './src/main.tsx',
            index: './src/index.html',
            baseHref: '/',
            assets: ['./src/favicon.ico', './src/assets'],
            styles: [],
            outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
            optimization: process.env['NODE_ENV'] === 'production',
        }),
        new NxReactWebpackPlugin({
            // Uncomment this line if you don't want to use SVGR
            // See: https://react-svgr.com/
        }),
    ],
};
