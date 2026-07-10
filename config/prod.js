const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminSvgo = require('imagemin-svgo')
const imageminGifsicle = require('imagemin-gifsicle')

const common = require('./common')

// Добавляем в массив все HTML файлы для копирования
// const htmlPageNames = ['extra-file'];
const htmlPageNames = [];
const multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		template: `./${name}.html`, // relative path to the HTML files
		filename: `${name}.html`, // output HTML files
		chunks: [`${name}`] // respective JS files
	})
});

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	output: {
	    filename: 'js/[name].[contenthash].bundle.js',
	    chunkFilename: 'js/[name].[contenthash].chunk.js'
	},
	target: 'browserslist',
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: 
		[
			new HtmlWebpackPlugin({
		    	title: 'Webpack App K',
		    	template: './index.html',
		    	chunks: ['main'],
                minify: {
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
		    }),
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
		].concat(multipleHtmlPlugins),
	performance: {
	    hints: 'warning',
	    maxEntrypointSize: 512000,
	    maxAssetSize: 512000
	}
})