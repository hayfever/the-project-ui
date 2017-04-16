const path    = require('path')
const glob    = require('glob')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  webpack: (config, { dev }) => {
    config.node = {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_HOST': JSON.stringify(process.env.API_HOST)
      })
    )

    return config
  }
}