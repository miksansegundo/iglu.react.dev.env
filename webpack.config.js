const {resolve} = require('path')
const WebpackShellPlugin = require('webpack-shell-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBrowserPlugin = require('webpack-browser-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const WebpackNotifierPlugin = require('webpack-notifier')
const webpackValidator = require('webpack-validator')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const OfflinePlugin = require('offline-plugin')
const webpack = require('webpack')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

module.exports = (env) => {
  const {ifProd} = getIfUtils(env)
  const config = webpackValidator({
    context: resolve('src'),
    cache: false,
    devtool: ifProd('source-map', 'inline-source-map'),
    entry: {
      app: './index.ts',
      polyfills: ['picturefill']
    },
    output: {
      path: resolve('build'),
      filename: ifProd('[name].bundle.[chunkhash].js', '[name].bundle.js'),
      sourceMapFilename: '[name].map',
      chunkFilename: '[chunkhash].[id].chunk.js',
      publicPath: ''
    },
    resolve: {
      extensions: ['.css', '.ts', '.tsx', '.js', '.json', '.jsx']
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style-loader', {
            loader: 'css-loader',
            query: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' }
          }, 'postcss-loader']
        },
        {
          test: /\.html$/,
          loader: 'html-loader!html-minify'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.tsx?$/,
          loaders: ['awesome-typescript-loader'],
          include: resolve('src')
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg#.*)$/,
          loader: 'url-loader'
        },
        { test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.(jpg)$/i,
          loader: 'responsive-loader'
        },
        {
          test: /\.(svg|png|jpg)$/,
          loader: 'url-loader?limit=100000!img?progressive=true'
        }

      ]
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['polyfills', 'manifest']
      })),
      new HtmlWebpackPlugin({
        cache: true,
        inject: 'head',
        template: 'index.html.ejs'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      ifProd(new InlineManifestWebpackPlugin()),
      new webpack.LoaderOptionsPlugin({
        options: {
          'html-minify-loader': {
            minifyCSS: true
          },
          responsiveLoader: {
            sizes: [320, 640, 1024]
          },
          postcss (webpackInstance) {
            return [
              // require('postcss-autoreset')(),
              require('postcss-smart-import')({
                addDependencyTo: webpackInstance
              }),
              require('postcss-url')({
                url: 'inline' // or "rebase" or "copy"
              }),
              require('postcss-cssnext')({
                features: {
                  rem: {
                    rootValue: 10,
                    html: false
                  }
                }
              }),
              require('postcss-browser-reporter')(),
              require('postcss-reporter')({ clearMessages: true })
            ]
          }
        }
      }),
      new WebpackMd5Hash(),
      ifProd(new WebpackBrowserPlugin()),
      new WebpackNotifierPlugin(),
      ifProd(new WebpackShellPlugin({onBuildStart: ['npm run copy:ico'], onBuildEnd: ['npm run clean:files']})),
      // new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      })
    ]),
    devServer: {
      stats: 'minimal',
      compress: false,
      inline: true,
      historyApiFallback: true,
      port: 8080
    }
  })

  if (env.debug) {
    console.log(config)
    debugger // eslint-disable-line
  }

  return config
}

