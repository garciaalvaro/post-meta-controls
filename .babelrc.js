module.exports = {
	plugins: ["@babel/plugin-proposal-class-properties"],

	presets: [
		// Uses .browserslistrc info
		"@babel/preset-env",
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
};
