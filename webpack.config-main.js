/* eslint-disable */
const { getConfig, dev } = require('./webpack.config-base');
const CopyPlugin = require('copy-webpack-plugin');

let terser = require('terser');
/* eslint-enable */

const mainConfig = getConfig({
  target: 'electron-main',

  devtool: dev ? 'inline-source-map' : false,

  watch: dev,

  entry: {
    main: './src/main.ts',
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from:
            'node_modules/@cliqz/adblocker-electron-preload/dist/preload.cjs.js',
          to: 'preload.js',
          transform: async (fileContent, path) => {
            return (
              await terser.minify(fileContent.toString())
            ).code.toString();
          },
        },
      ],
    }),
  ],
});

const preloadConfig = getConfig({
  target: 'web',

  devtool: false,

  watch: dev,

  entry: {
    'view-preload': './src/skye/preloads/view-preload',
  },

  plugins: [],
});

if (process.env.ENABLE_EXTENSIONS) {
  preloadConfig.entry['popup-preload'] = './src/skye/preloads/popup-preload';
  preloadConfig.entry['extensions-preload'] =
    './src/skye/preloads/extensions-preload';
}

module.exports = [mainConfig, preloadConfig];
