const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
	{
		entry: __dirname + "/copy.entry.js",
		output: {
			path: __dirname + "/../_extras/release",
			filename: "_temp.js"
		},
		plugins: [
			new CopyPlugin([
				{
					from: "**/*",
					ignore: [
						".*",
						".*/**",
						"_extras/**",
						"_temp.js",
						"documentation/**",
						"enzyme.config.js",
						"jest*",
						"node_modules/**",
						"package.json",
						"package-lock.json",
						"pro/**",
						"src/**",
						"tsconfig.json",
						"types.d.ts"
					]
				}
			])
		]
	}
];
