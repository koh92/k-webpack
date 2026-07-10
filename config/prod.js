const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminSvgo = require('imagemin-svgo')
const imageminGifsicle = require('imagemin-gifsicle')

const common = require('./common')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
	    filename: 'js/[name].[contenthash].bundle.js',
	    chunkFilename: 'js/[name].[contenthash].chunk.js'
	},
	target: 'browserslist',
	optimization: {
		// minimize: false,
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: 
		[
			new MiniCssExtractPlugin({
		      filename: 'css/[name].[contenthash].css',
		      // chunkFilename: '[id].css'
		      // chunkFilename: '[name].css'
		    }),
		    new ImageminPlugin({
			    test: /\.(jpe?g|png|gif|svg)$/i,
			    pngquant: ({quality: 75}),
			    plugins: [
			    	imageminMozjpeg({quality: 75}),
			    	// imageminJpegtran({progressive: true}), // сжатие хуже
			    	imageminSvgo(),
			    	imageminGifsicle({optimizationLevel: 3}),
			    ]
		    }),
		],
	performance: {
	    hints: 'warning',
	    maxEntrypointSize: 512000,
	    maxAssetSize: 512000
	}
})