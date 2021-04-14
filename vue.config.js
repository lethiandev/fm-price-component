const { defineConfig } = require('@vue/cli-service')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  publicPath: isProduction ? '/fm-price-component' : '/',
  chainWebpack: config => {
    // Fix scss modules configuration
    config.module
      .rule('scss')
      .oneOf('normal-modules')
      .use('css-loader')
      .tap(options => {
        options.modules = {
          localIdentName: '[name]_[local]_[hash:base64:5]',
          exportLocalsConvention: 'camelCase',
          auto: true,
        }

        return options
      })
  },
})
