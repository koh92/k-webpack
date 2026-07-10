let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
	},
	devServer: {
		hot: true,
	    static: path.resolve(__dirname, './dist'),
	    // overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
	    new HtmlWebpackPlugin({
	    	template: './index.html'
	    }),
	    new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	]
}
module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
	conf.target = isProd ? 'browserslist' : 'web';
	return conf;
}