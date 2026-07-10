const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');

const CopyWebpackPlugin = require("copy-webpack-plugin");

const devConf = {
	context: path.resolve(__dirname, './src'),
	mode: 'development',
  devtool: 'eval-cheap-source-map',
  target: 'web',
	entry: './js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		clean: true,
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: true,
		open: true,
		port: 8000,
		watchFiles: ['src/**/*'],
	    client: {
	      	overlay: true,
	    },
	},
	module: {
		rules: [
			// js
			{
				test: /\.js$/i,
				use: {
			    	loader: 'babel-loader',
			    	options: {
		          // presets: ['@babel/preset-env']
		        }
			   	},
				exclude: '/node_modules/'
			},
			// CSS, SASS|SCSS
			{
		        test: /\.((c|sa|sc)ss)$/i,
		        use: [
		        	// style-loader create inline tag style
		        	// MiniCssExtractPlugin create separete file style

		        	// Creates `style` nodes from JS strings
		        	// devMode ? "style-loader" : MiniCssExtractPlugin.loader,
		        	MiniCssExtractPlugin.loader,
		        	// Translates CSS into CommonJS
		        	"css-loader",
		        	// Post CSS process
		        	{
		        	  loader: "postcss-loader",
		        	  options: {
		        	    postcssOptions: {
		        	      plugins: [
		        	      	postcssPresetEnv({
		        	      		stage: 2, // 0 (experimental) - 4 (stable) | default is 2
		        	      		browsers: 'last 2 versions'
		        	      	})
		        	      ],
		        	    },
		        	  }
		        	},
		        	// Compiles Sass to CSS
		        	"sass-loader"
		        ],
		    },
		]
	},
	plugins:
		[
			new HtmlWebpackPlugin({
		    	title: 'Webpack App K',
		    	template: './index.html'
		    }),
		    new MiniCssExtractPlugin(),
		    new CopyWebpackPlugin({
			    patterns: [
			      	// images
			        { from: './images', to: '../dist/images', noErrorOnMissing: true, },
			        // fonts
			        { from: './fonts', to: '../dist/fonts', noErrorOnMissing: true, }
			    ],
		    }),
		]
}

let htmlPageNames = ['extra-file'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

const prodConf = {
	context: path.resolve(__dirname, 'src'),
	mode: 'production',
  devtool: false,
  target: 'browserslist',
	entry: './js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[contenthash].bundle.js',
		clean: true,
	},
	optimization: {
		splitChunks: {chunks: 'all'}
	},
	module: {
		rules: [
			// js
			{
				test: /\.js$/i,
				use: {
			    	loader: 'babel-loader',
			    	options: {
		          presets: ['@babel/preset-env']
		        }

			   	},
				exclude: '/node_modules/'
			},
			// CSS, SASS|SCSS
			{
		        test: /\.((c|sa|sc)ss)$/i,
		        use: [
		        	// style-loader create inline tag style
		        	// MiniCssExtractPlugin create separete file style

		        	// Creates `style` nodes from JS strings
		        	// devMode ? "style-loader" : MiniCssExtractPlugin.loader,
		        	MiniCssExtractPlugin.loader,
		        	// Translates CSS into CommonJS
		        	"css-loader",
		        	// Post CSS process
		        	{
		        	  loader: "postcss-loader",
		        	  options: {
		        	    postcssOptions: {
		        	      plugins: [
		        	      	postcssPresetEnv({
		        	      		stage: 2, // 0 (experimental) - 4 (stable) | default is 2
		        	      		browsers: 'last 2 versions'
		        	      	})
		        	      ],
		        	    },
		        	  }
		        	},
		        	// Compiles Sass to CSS
		        	"sass-loader"
		        ],
		    },
		]
	},
	plugins: 
		[
		    new HtmlWebpackPlugin({
		    	title: 'Webpack App K',
		    	template: './index.html',
		    	chunks: ['main']
		    }),
		    new MiniCssExtractPlugin({
		      filename: 'css/[name].[contenthash].css',
		      chunkFilename: '[id].css'
		    }),
		    new CopyWebpackPlugin({
			    patterns: [
			      	// images
			        { from: './images', to: '../dist/images', noErrorOnMissing: true },
			        // fonts
			        { from: './fonts', to: '../dist/fonts', noErrorOnMissing: true }
			    ],
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
}
module.exports = (env, options) => {
	return options.mode == "production" ? prodConf : devConf;
}