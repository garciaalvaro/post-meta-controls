import { name, version, description, homepage } from "../package.json";
import { BannerPlugin, DefinePlugin } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nib from "nib";
import path from "path";

export default {
	entry: path.join(__dirname, "../src/index.ts"),
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}.js`
	},
	resolve: {
		alias: {
			Components: path.join(__dirname, "../src/Components"),
			store: path.join(__dirname, "../src/store"),
			utils: path.join(__dirname, "../src/utils")
		}
	},
	externals: {
		lodash: "lodash",
		moment: "moment",
		react: "React",
		"react-dom": "ReactDOM",
		"@wordpress/block-editor": "wp.blockEditor",
		"@wordpress/editor": "wp.editor",
		"@wordpress/api-fetch": "wp.apiFetch",
		"@wordpress/components": "wp.components",
		"@wordpress/compose": "wp.compose",
		"@wordpress/data": "wp.data",
		"@wordpress/dom-ready": "wp.domReady",
		"@wordpress/edit-post": "wp.editPost",
		"@wordpress/element": "wp.element",
		"@wordpress/hooks": "wp.hooks",
		"@wordpress/i18n": "wp.i18n",
		"@wordpress/plugins": "wp.plugins",
		"@wordpress/url": "wp.url"
	},
	module: {
		rules: [
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
							import: [
								"~nib/index.styl",
								path.join(__dirname, "../src/utils/data/stylus_variables.styl")
							]
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
