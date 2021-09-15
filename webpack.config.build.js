const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'common', chunks: 'all' }
      }
    }
  },

  output: {
    path: path.join(__dirname, 'public')
  }
})
