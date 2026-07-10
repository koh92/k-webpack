const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./common')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	// devtool: 'source-map',
	target: 'web',
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		open: true,
		port: 8000,
		watchFiles: ['src/**/*'],
	    client: {
	      	overlay: {
		        errors: true,
		        warnings: false,
	      	},
	    },
	},
  	plugins: [
  		new MiniCssExtractPlugin({
	    	filename: 'css/[name].css',
	    	// chunkFilename: '[id].css'
	    }),
  	]
})