const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
	},
	devServer: {
		hot: true,
	    static: path.resolve(__dirname, './dist')
	},
	plugins: [
	    new HtmlWebpackPlugin({
	    	template: './index.html'
	    }),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			}
		]
	}
}
module.exports = (env, argv) => {
	// if (argv.mode === 'development') {
	//     config.devtool = 'source-map';
	// }
	return conf;
};