import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export default {
	entry: path.join(__dirname, "copy.entry.js"),
	output: {
		path: path.join(__dirname, "../_release"),
		filename: "_temp.js",
	},
	plugins: [
		new CopyPlugin([
			{
				from: "**/*",
				ignore: [
					".*",
					".*/**",
					"_extras/**",
					"_release/**",
					"_temp.js",
					"assets-repo/**",
					"documentation/**",
					"enzyme.config.js",
					"jest*",
					"node_modules/**",
					"package.json",
					"package-lock.json",
					"pro/**",
					"README.md",
					"src/**",
					"tsconfig.json",
					"types/**",
					"webpack/**",
				],
			},
		]),
	],
};
