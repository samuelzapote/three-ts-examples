const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/main.ts',
	devtool: 'inline-source-map',
	module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
	},
	resolve: {
    extensions: ['.ts', '.js'],
  },
	devServer: {
		contentBase: './dist',
	},
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
