import { name } from "../package.json";
import path from "path";

export default {
	entry: path.join(__dirname, "pragma.entry.js"),
	output: {
		path: path.join(__dirname, "../_release"),
		filename: "_temp.js"
	},
	module: {
		rules: [
			{
				test: new RegExp(`${name}\.php$`),
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					},
					{
						loader: "webpack-loader-clean-pragma",
						options: {
							pragmas: [
								{
									start: "/** @dev_start */",
									end: "/** @dev_end */"
								},
								{
									start: "/** @pro_start */",
									end: "/** @pro_end */"
								}
							]
						}
					}
				]
			}
		]
	}
};
