const webpack = require('webpack')

const paths = require('./paths')
const { merge } = require('webpack-merge')

const common = require('./common')

module.exports = merge(common, {
	mode: 'production',
	devtool: false,
	target: 'browserslist',
	optimization: {
		splitChunks: {
			// Данное свойство НЕ ВКЛЮЧАТЬ! Ломает сборку
			// chunks: 'all',
			cacheGroups: {
				defaultVendors: {
					// If you will to use the test as /[\\/]node_modules[\\/], without extension specification, then Webpack concatenates JS code together with CSS in one file, because Webpack can't differentiate CSS module from JS module, therefore you MUST match only JS files.
					test: /[\\/]node_modules[\\/].+\.(js|ts)$/, // split JS only, ignore CSS modules
					// save chunk under a name
					name(module, chunks, groupName) {
						let moduleName = module.resourceResolveData.descriptionFileData.name.replace('@', '');
						if('fancyapps/ui' === moduleName) {
							moduleName = moduleName.replace('/ui', '')
						}
						return `${moduleName}`;
					},
					chunks: 'all',
				},
			},
		},
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
})