const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const common = require('./common')

module.exports = merge(common, {
	mode: 'development',
	// devtool: 'eval-cheap-source-map',
	devtool: 'eval-source-map',
	target: 'web',
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		open: true,
		port: 8000,
		watchFiles: {
			paths: ['src/**/*.*'],
			options: {
				usePolling: true,
			},
		},
	    client: {
		    // progress: true,
	      	overlay: {
		        errors: true,
		        warnings: false,
	      	},
	    },
		static: {
			directory: paths.src,
			watch: true
		}
	},
	// stats: 'errors-only',
})