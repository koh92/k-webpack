const webpack = require('webpack')

const paths = require('./paths')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcss = require('postcss')
const postcssPresetEnv = require('postcss-preset-env')

const isProd = process.env.NODE_ENV === 'production'

/* ----------------------------------------------------------------
 * Output Settings
 * ----------------------------------------------------------------
 */

const separateCssOutputFiles = true // Разделить CSS файлы (только для Production режима)
const isMinifyHTMLFiles = false // Минифицировать HTML файлы

const minifyOptions = {
    collapseWhitespace: true, // Удалить пробелы | default: false
    keepClosingSlash: true, // Сохранить слэш в конце одиночных тегов | default: false
    removeComments: true, // Удалить комментарии default: false
    removeRedundantAttributes: true, // Удалить атрибуты, когда значение соответствует умолчанию | default: false
    removeScriptTypeAttributes: true, // Remove type="text/javascript" from script tags | default: false
    removeStyleLinkTypeAttributes: true, // Remove type="text/css" from style and link tags | default: false
    useShortDoctype: true // Replaces the doctype with the short (HTML5) doctype | default: false
}

/* ----------------------------------------------------------------
 * Output Settings END
 * ----------------------------------------------------------------
 */

const cssOutputConfig = 
	separateCssOutputFiles && isProd ? 
	{
	    loader: 'file-loader',
	    options: {
	        outputPath: 'css/',
	        name: '[name].min.css',
	        url: false, // prevent creating images from styles
			sourceMap: true,
	    }
	} : {
	    
	    loader: "css-loader",
	    options: {
	        url: false, // prevent creating images from styles
	    }
	}

const minifyImages =
	isProd ?
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			type: "asset",
		} :
		{}

// Добавляем в массив все HTML файлы для копирования
const htmlPageNames = [
	'index',
	'about',
	'delivery',
	'articles',
	'articles-inner',
	'faq',
	'contacts',
	'catalog',
	'catalog-category',
	'catalog-subcategory',
	'product',
	'wishlist',
	'cart',
	'order',
	'order-success',
	'account-main',
	'account-orders',
	'search',
	'public_offer',
	'policy',
	'404',
	'registration',
	'enter'
];
const multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		title: name,
		filename: `${name}.html`, // output HTML files
		template: `./${name}.html`, // relative path to the HTML files
        minify: isMinifyHTMLFiles ? minifyOptions : false // isMinify HTML files
        // minify: isProd ? minifyOptions : false // isMinify HTML files
        // minify: isProd ? false : false
	})
});

module.exports = {
	context: paths.src,
	// entry: './js/index.js',
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
                use: [
                	separateCssOutputFiles && isProd ? cssOutputConfig : MiniCssExtractPlugin.loader, cssOutputConfig,
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
                ]
		    },
			minifyImages,
		]
	},
	plugins: 
		[
		    new CopyWebpackPlugin({
			    patterns: [
			      	// images
			        { from: './images', to: `${paths.dist}/images`, noErrorOnMissing: true, },
			        // fonts
			        { from: './fonts', to: `${paths.dist}/fonts`, noErrorOnMissing: true, }
			    ],
		    }),
		].concat(multipleHtmlPlugins)
}