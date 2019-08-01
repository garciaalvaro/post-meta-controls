const { name, version, description, homepage } = require("../package.json");
const webpack = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BannerPlugin = webpack.BannerPlugin;
const nib = require("nib");
const DefinePlugin = webpack.DefinePlugin;

export default {
	entry: ["./src/index.ts", "./src/index.styl"],
	output: {
		path: __dirname + "/../build",
		filename: `${name}.js`
	},
	resolve: {
		alias: {
			Components: __dirname + "/../src/js/Components",
			utils: __dirname + "/../src/js/utils",
			init: __dirname + "/../src/js/init"
		}
	},
	externals: {
		lodash: "lodash",
		react: "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: [".js", ".jsx"]
				},
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							use: [nib()],
							import: ["~nib/index.styl"]
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new MiniCssExtractPlugin({
			filename: `${name}.css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				"/*! TinyColor | https://github.com/bgrins/TinyColor | 2016-07-07, Brian Grinstead | MIT License */",
				"/*! array-move | https://github.com/sindresorhus/array-move | Sindre Sorhus | MIT License */",
				"/*! DOMPurify | https://github.com/cure53/DOMPurify | Mario Heiderich | MPL-2.0 OR Apache-2.0 */",
				"/*! immer | https://github.com/mweststrate/immer | Michel Weststrate | MIT License */",
				"/*! moment | http://momentjs.com | Iskren Ivov Chernev | MIT License */",
				"/*! react-dates | https://github.com/airbnb/react-dates#readme | Maja Wichrowska | MIT License */",
				"/*! react-sortable-hoc | https://github.com/clauderic/react-sortable-hoc | Clauderic Demers | MIT License */",
				"/*! uuid | https://github.com/kelektiv/node-uuid | MIT License */"
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${description} | ${version} | ${homepage}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
