const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const conf = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
	},
	devServer: {
		port: 8000,
		historyApiFallback: true,
		hot: true,
	    client: {
	    	progress: true,
	      	overlay: true,
	    },
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				use: {
			    	loader: 'babel-loader',
			   	},
				// loader: "babel-loader",
				exclude: '/node_modules/'
			},
			// {
			// 	test: /\.css$/i,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader']
			// },
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
		          // "postcss-loader",
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
		 //    {
			//    	test: /\.(png|jpe?g|gif)$/i,
			//    	// type: 'dist/images',
			//    	// type: 'asset/resource',
			//    	use: [
			//        	{
			//         	loader: 'file-loader',
			//        	},
			//    	],
			// },
		    {
			    test: /\.(png|jpg|gif|ico|svg)$/i,
			    loader: 'file-loader',
			    options: {
			        name: './images/[name].[ext]'
			    }
		    }
		]
	},
	plugins: [].concat(devMode ? 
		// Develop mode
		[
			new HtmlWebpackPlugin({
		    	title: 'Webpack App K',
		    	template: path.resolve(__dirname, './index.html')
		    }),
		    new MiniCssExtractPlugin(),
		// Production mode
		] : [
			new CleanWebpackPlugin(),
		    new HtmlWebpackPlugin({
		    	title: 'Webpack App K',
		    	template: path.resolve(__dirname, './index.html')
		    }),
		    new MiniCssExtractPlugin(),

		    new ImageminPlugin({
		      test: /\.(jpe?g|png|gif|svg)$/i
		    })


	    // new CopyPlugin({
	    //   patterns: [
	    //     { from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, './dist') }
	    //   ],
	    // }),

		// new ImageminPlugin({
	 //      disable: process.env.NODE_ENV !== 'production', // Disable during development
	 //      pngquant: {
	 //        quality: '95-100'
	 //      },
	 //      // test: /\.(jpe?g|png|gif|svg)$/i
	 //    })
	])
}
module.exports = (env, options) => {
	const isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
	conf.target = isProd ? 'browserslist' : 'web';
	return conf;
}