const webpack = require('webpack')

const paths = require('./paths')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
	context: paths.src,
	entry: './js/index.js',
	output: {
		path: paths.dist,
		filename: 'js/[name].bundle.js',
		clean: true
	},
	cache: false,
	module: {
		rules: [
			// js
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
		        test: /\.((c|sa|sc)ss)$/i,

                // One CSS file in Prod
		        use: [
		        	// style-loader create inline tag style
		        	// MiniCssExtractPlugin create separete file style

		        	// Creates `style` nodes from JS strings
		        	// devMode ? "style-loader" : MiniCssExtractPlugin.loader,
		        	MiniCssExtractPlugin.loader,
		        	// Translates CSS into CommonJS
		        	// "css-loader",
		        	{
                        loader: "css-loader",
                        options: {
                        	// prevent creating images from styles
                            url: false
                        }
                    },
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
                // Separate CSS files in Prod
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             outputPath: 'css/',
                //             name: '[name].min.css',
                //             url: false // prevent creating images from styles
                //         }
                //     },
                //     // Post CSS process
                //     {
                //       loader: "postcss-loader",
                //       options: {
                //         postcssOptions: {
                //           plugins: [
                //             postcssPresetEnv({
                //                 stage: 2, // 0 (experimental) - 4 (stable) | default is 2
                //                 browsers: 'last 2 versions'
                //             })
                //           ],
                //         },
                //       }
                //     },
                //     // Compiles Sass to CSS
                //     "sass-loader"
                // ]
		    },
		]
	},
	plugins: 
		[
			new HtmlWebpackPlugin({
				filename: 'index.html',
		    	template: './index.html'
			}), // Generates default index.html
		    new HtmlWebpackPlugin({
		    	filename: 'news.html',
		    	template: './news.html'
		    }),
		    new HtmlWebpackPlugin({
		    	filename: 'news-inner.html',
		    	template: './news-inner.html'
		    }),
		    new HtmlWebpackPlugin({
		    	filename: 'info.html',
		    	template: './info.html'
		    }),
		    new HtmlWebpackPlugin({
		    	filename: 'info-inner.html',
		    	template: './info-inner.html'
		    }),
		    new CopyWebpackPlugin({
			    patterns: [
			      	// images
			        { from: './images', to: `${paths.dist}/images`, noErrorOnMissing: true, },
			        // fonts
			        { from: './fonts', to: `${paths.dist}/fonts`, noErrorOnMissing: true, }
			    ],
		    }),
		]
}