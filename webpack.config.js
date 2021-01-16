const {
	name: short_name,
	description: name,
	version,
	homepage,
} = require("./package.json");
const { BannerPlugin } = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env, { mode }) => {
	const is_production = mode === "production";
	const is_development = !is_production;

	const config = {
		watch: is_development,

		entry: {
			[short_name]: path.resolve(__dirname, "src/entry.ts"),

			[`${short_name}-moment-locales`]: path.resolve(
				__dirname,
				"node_modules/moment/min/locales.js?pmc"
			),
		},

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].js",
		},

		resolve: {
			alias: {
				Components: path.resolve(__dirname, "src/components"),
				store: path.resolve(__dirname, "src/store"),
				utils: path.resolve(__dirname, "src/utils"),
			},
		},

		externals: {
			lodash: "lodash",
			moment: "moment",
			react: "React",
			"react-dom": "ReactDOM",
			"@wordpress/api-fetch": "wp.apiFetch",
			"@wordpress/block-editor": "wp.blockEditor",
			"@wordpress/components": "wp.components",
			"@wordpress/compose": "wp.compose",
			"@wordpress/data": "wp.data",
			"@wordpress/edit-post": "wp.editPost",
			"@wordpress/editor": "wp.editor",
			"@wordpress/element": "wp.element",
			"@wordpress/hooks": "wp.hooks",
			"@wordpress/i18n": "wp.i18n",
			"@wordpress/plugins": "wp.plugins",
			"@wordpress/url": "wp.url",
		},

		module: { rules: [] },

		plugins: [],
	};

	config.module.rules.push({
		test: /\.tsx?$/,
		exclude: /node_modules/,
		loader: "babel-loader",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
	});

	config.module.rules.push({
		test: /node_modules\/moment.+\.js?$/,
		loader: path.resolve(__dirname, "scripts/webpack_loader-moment"),
		resourceQuery: /pmc/,
	});

	config.module.rules.push({
		test: /\.(css|styl)$/,
		use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
	});

	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: "[name].css",
		})
	);

	if (is_production) {
		config.plugins.push(
			new BannerPlugin({
				banner: `${name} v${version} | ${homepage}`,
				include: /\.css/,
			})
		);

		config.plugins.push(
			new BannerPlugin({
				banner: [
					`${name} v${version} | ${homepage}`,
					"TinyColor | https://github.com/bgrins/TinyColor | 2016-07-07, Brian Grinstead | MIT License",
					"array-move | https://github.com/sindresorhus/array-move | Sindre Sorhus | MIT License",
					"DOMPurify | https://github.com/cure53/DOMPurify | Mario Heiderich | MPL-2.0 OR Apache-2.0",
					"immer | https://github.com/mweststrate/immer | Michel Weststrate | MIT License",
					"moment | http://momentjs.com | Iskren Ivov Chernev | MIT License",
					"react-dates | https://github.com/airbnb/react-dates#readme | Maja Wichrowska | MIT License",
					"react-sortable-hoc | https://github.com/clauderic/react-sortable-hoc | Clauderic Demers | MIT License",
					"uuid | https://github.com/kelektiv/node-uuid | MIT License",
				].join("\n"),
				include: new RegExp(`${short_name}.js$`),
			})
		);

		config.plugins.push(
			new BannerPlugin({
				banner: [
					`${name} v${version} | ${homepage}`,
					`Moment.js | https://github.com/moment/moment | Iskren Ivov Chernev | MIT License`,
				].join("\n"),
				include: new RegExp(`${short_name}-moment-locales.js$`),
			})
		);

		config.optimization = {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(),

				// As we are using a custom optimization, making use of
				// CssMinimizerPlugin, we also need to specify TerserPlugin
				new TerserPlugin({ extractComments: false }),
			],
		};
	}

	return config;
};
