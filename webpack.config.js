/* global __dirname, require, module*/

const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const libraryName = pkg.name

let outputFile, buildMode

const patterns = [
  {
    from: './src/index.d.ts',
    to: './index.d.ts',
  },
]

if (env === 'build') {
  buildMode = 'production'
  outputFile = libraryName + '.min.js'
} else {
  buildMode = 'development'
  outputFile = libraryName + '.js'
}

const config = {
  mode: buildMode,
  optimization: { minimize: buildMode === 'production' },
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins: [new CopyWebpackPlugin([...patterns])],
}

module.exports = config
