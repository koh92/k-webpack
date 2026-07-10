const webpack = require('webpack')

const paths = require('./paths')

const PugPlugin = require('pug-plugin')

const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const rawPages = fs.readdirSync(paths.src).filter(fileName => fileName.endsWith('.pug'))

let pagesList = {}
rawPages.forEach((value) => pagesList[`${value.replace(/\.pug/,'')}`] = `./${value}`);

module.exports = {
	context: paths.src,
	entry: pagesList,
	output: {
		path: paths.dist,
		filename: './js/[name].bundle.js',
		clean: true,
		publicPath: isProd ? './' : '/',
	},
	// cache: true,
	cache: {
		type: "filesystem",
		buildDependencies: {
			config: [ __filename ] // you may omit this when your CLI automatically adds it
		}
	},
	module: {
		rules: [
			// PUG
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
				options: {
					data: {
						isProd // pass global variable into all Pug files
					}
				},
			},
			// JS
			{
				test: /\.js$/i,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
			},
			// CSS, SASS|SCSS
			{
				test: /\.(css|sass|scss)$/,
				use: [
					'css-loader',
					// Settings in postcss.config.js
					'postcss-loader',
					// Compiles Sass to CSS
					'sass-loader',
				]
			},
			// Images
			{
				test: /\.(png|jpg|jpeg|ico|svg)/,
				type: 'asset/resource',
				generator: {
					// output filename of images
					filename: `[name][ext]`,
					outputPath: 'assets/images/',
				},
			},
			// Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					// output filename of fonts
					filename: `[name][ext][query]`,
					outputPath: 'assets/fonts/',
				},
			},
		]
	},
	resolve: {
		alias: {
			// use alias to avoid relative paths like `./../../images/`
			Images: `${paths.src}/images/`,
			Fonts: `${paths.src}/fonts/`,
			Node: `${paths.public}/node_modules/`,
		}
	},
	plugins:
		[
			new PugPlugin({
				pretty: true, // formatting HTML, useful for development mode
				// Минифицированный HTML на выходе не удобно редактировать
				// pretty: !isProd, // formatting HTML, useful for development mode
				js: {
					// output filename of extracted JS file from source script
					// filename: '/js/[name].[contenthash:8].js',
					filename: 'assets/js/[name].min.js',
					// Использование outputPath ломает картинки из стилей
					// outputPath: 'assets/js/',
				},
				css: {
					// output filename of extracted CSS file from source style
					// filename: '/css/[name].[contenthash:8].css',
					filename: 'assets/css/[name].min.css',
					// Использование outputPath ломает картинки из стилей
					// outputPath: 'assets/css/',
				},
			})
		]
}