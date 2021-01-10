import { name, version, description, homepage } from "../package.json";
import { BannerPlugin } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";
import path from "path";

export default {
	entry: path.join(__dirname, "../node_modules/moment/min/locales.js"),
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}-moment-locales.js`,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "string-replace-loader",
						options: {
							search: /^[\S\s]*?}\(this, \(([\S\s]*?)}\)\)\);/
								.source,
							replace: [
								`wp.hooks.addAction( "postMetaControls.addMomentLocale", "addMomentLocale", `,
								`$1`,
								`});`,
							].join(""),
							flags: "g",
						},
					},
				],
			},
		],
	},
	plugins: [
		new TerserJSPlugin({
			terserOptions: {
				output: { comments: false },
			},
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				`\n/*! Moment.js | https://github.com/moment/moment | Iskren Ivov Chernev | MIT License */`,
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/),
		}),
	],
};
