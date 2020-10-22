const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssLoaders = isDev => {
	const loaders = [
		// "style-loader",
		"vue-style-loader", {
			loader : MiniCssExtractPlugin.loader,
		},
		{
			loader : "css-loader",
			options : {sourceMap : isDev, importLoaders : 1}
		},
		{
			loader : "postcss-loader",
			options : {
				ident : "postcss",
				sourceMap : isDev,
				plugins : postCssPlugins(!isDev)
			}
		}
	];

	return loaders;
};

const postCssPlugins = isProd => {
	const plugins = [
		require("postcss-import")(),
		require("postcss-preset-env")({
			stage : 3,
			features : {
				"custom-media-queries" : true,
				"custom-properties" : true,
				"custom-selectors" : true,
				"nesting-rules" : true,
				"system-ui-font-family" : true
			}
		}),
		require("autoprefixer")(),
		require('postcss-media-minmax')(),
		require("postcss-sort-media-queries")({sort : "desktop-first"}),
	];

	if (isProd) {
		plugins.push(require("cssnano")({
			preset : [
				"default",
				{discardComments : {removeAll : true}}
			]
		}));
	}

	return plugins;
};

// eslint-disable-next-line no-unused-vars
module.exports = (_, opt) => {
	const isProd = opt.mode === "production";
	const isDev = !isProd;

	return {
		entry : {main : path.resolve(__dirname, "src/index.js")},
		output : {
			filename : "[name].js",
			path : path.resolve(__dirname, "dist")
		},
		devtool : isDev ? "eval" : false,
		mode : isDev ? 'development' : 'production',
		devServer : {
			port : 8080,
			contentBase : path.join(__dirname, 'dist'),
			compress : true,
			writeToDisk : true,
			overlay : true,
			stats : {
				moduleAssets : false,
			},
		},
		module : {
			rules : [
				{
					test : /\.js$/,
					exclude : /node_modules/,
					loader : "babel-loader",
					options :
					    {presets : [ '@babel/preset-env' ]}
				},
				{test : /\.css$/, use : cssLoaders(isDev)},
				{test : /\.vue$/, loader : 'vue-loader'}, {
					test : /\.(png|jpe?g|gif)$/i,
					use : [
						{
							loader : 'url-loader',
							options : {
								limit : 1048,
								fallback : {
									loader :
									    'file-loader',
									options : {
										name :
										    "img/[name].[ext]"
									}
								}
							},
						},
					],
				}
			]
		},
		plugins : [
			new CleanWebpackPlugin(), new HtmlWebpackPlugin({
				filename : "index.html",
				template :
				    path.resolve(__dirname, "src/index.html"),

			}),
			new HtmlWebpackPlugin({
				filename : "about.html",
				template :
				    path.resolve(__dirname, "src/about.html"),

			}),
			new MiniCssExtractPlugin({filename : "[name].css"}),
			new VueLoaderPlugin(), new CopyWebpackPlugin({
				patterns : [
					{
						from : path.resolve(__dirname,
								    "src/img"),
						to : "img",
						noErrorOnMissing : true
					},
					{
						from : path.resolve(
						    __dirname,
						    "src/favicon.ico"),
						noErrorOnMissing : true
					}
				],
				options : {concurrency : 100}
			})
		],
		resolve : {
			extensions : [ ".js", ".vue", ".css" ],
			alias : {
				'@' : path.resolve(__dirname, 'src/js'),
				"vue$" : isDev ? "vue/dist/vue.runtime.js"
					       : "vue/dist/vue.runtime.min.js"
			}
		}
	};
};
