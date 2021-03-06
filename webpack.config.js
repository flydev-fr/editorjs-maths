module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['@babel/preset-env'],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			},
		],
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js',
		library: 'MathTool',
		libraryTarget: 'umd',
		libraryExport: 'default',
	},
};
