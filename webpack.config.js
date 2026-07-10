const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require("copy-webpack-plugin");

const devConf = {
	mode: 'development',
  	devtool: 'eval-cheap-source-map',
  	target: 'web',
	entry: path.resolve(__dirname, './src/js/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
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
		    	template: path.resolve(__dirname, './src/index.html')
		    }),
		    new MiniCssExtractPlugin(),
		    new webpack.HotModuleReplacementPlugin()
		]
}
const prodConf = {
	mode: 'production',
  	devtool: false,
  	target: 'browserslist',
	entry: path.resolve(__dirname, './src/js/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[contenthash].bundle.js',
		clean: true,
	},
	module: {
		rules: [
			// js
			{
				test: /\.js$/i,
				use: {
			    	loader: 'babel-loader',
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
		    	template: path.resolve(__dirname, './src/index.html')
		    }),
		    new MiniCssExtractPlugin({
		      filename: 'css/[name].[contenthash].css',
		      chunkFilename: '[id].css'
		    }),
		    new CopyWebpackPlugin({
			    patterns: [
			      	// images
			        { from: path.resolve(__dirname, './src/images'), to: path.resolve(__dirname, './dist/images'), noErrorOnMissing: true, },
			        // fonts
			        { from: path.resolve(__dirname, './src/fonts'), to: path.resolve(__dirname, './dist/fonts'), noErrorOnMissing: true, }
			    ],
		    }),
		    new ImageminPlugin({
			    test: /\.(jpe?g|png|gif|svg)$/i,
			    optipng: {
			      optimizationLevel: 7
			    },
		    }),
		],
		performance: {
		    hints: 'warning',
		    maxEntrypointSize: 512000,
		    maxAssetSize: 512000
		}
}
module.exports = (env, options) => {
	return options.mode == "production" ? prodConf : devConf;
}