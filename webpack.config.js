const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
//const validate = require('webpack-validator');

const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};

module.exports = function(env) {
 if (env === 'build') {
    return merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.minify(),
      parts.setupCSS(PATHS.app)
    );
  } 

  return merge(
    common,
    {
      // Disable performance hints during development
      devtool: 'source-map',
      output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        // This is used for code splitting. The setup
        // will work without but this is useful to set.
        chunkFilename: '[chunkhash].js'
      }
    },
    parts.clean(PATHS.build),
    parts.setFreeVariable(
      'process.env.NODE_ENV',
      'production'
    ),
    parts.extractBundle({
      name: 'vendor',
      entries: ['react']
    }), 
    parts.setupCSS(PATHS.app),
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT
    })
  );
}
