import gulp from "gulp";
import zip from "gulp-zip";
import header from "gulp-header";
import rename from "gulp-rename";
import replace from "gulp-replace";
import run from "gulp-run-command";
import fs from "fs";
import merge2 from "merge2";
import pkg from "./package.json";

const main_plugin_file = `${pkg.name}.php`;

gulp.task(
	"parcel",
	run([
		`parcel build src/index.js -o ${
			pkg.name
		}.min.js -d build --no-source-maps`
	])
);

gulp.task("version", () => {
	const main_php = gulp
		.src(main_plugin_file)
		.pipe(replace(/( \* Version: )\d+\.\d+\.\d+/g, "$1" + pkg.version))
		.pipe(
			replace(
				/(define.*?PLUGIN_VERSION.*?)\d+\.\d+\.\d+/g,
				"$1" + pkg.version
			)
		)
		.pipe(gulp.dest("."));

	const readme_txt = gulp
		.src("readme.txt")
		.pipe(replace(/(Stable tag: )\d+\.\d+\.\d+/g, "$1" + pkg.version))
		.pipe(gulp.dest("."));

	return merge2(main_php, readme_txt);
});

gulp.task("zip", () => {
	const js_with_header = gulp
		.src([`build/${pkg.name}.min.js`], { base: "../" })
		.pipe(
			header(fs.readFileSync("./src/js/#header", "utf8"), {
				pkg: pkg
			})
		);

	const css_with_header = gulp
		.src([`build/${pkg.name}.min.css`], { base: "../" })
		.pipe(
			header(fs.readFileSync("./src/css/#header", "utf8"), {
				pkg: pkg
			})
		);

	const without_dev = gulp
		.src([`${pkg.name}.php`], { base: "../" })
		.pipe(replace(/\n\/\/\sDEV_start(.|\n)*?\/\/\sDEV_end/, ""))
		.pipe(replace(/\n\/\/\sPRO_start(.|\n)*?\/\/\sPRO_end/, ""));

	const renamed = merge2(js_with_header, css_with_header).pipe(
		rename(path => {
			path.basename = path.basename.replace(".min", "");
		})
	);

	return merge2(
		renamed,
		gulp.src(
			[
				"**",
				"!.*",
				"!.*/**",
				"!node_modules/**",
				"!documentation/**",
				"!pro/**",
				"!_extras/**",
				"!gulp*",
				"!yarn*",
				"!src/**",
				"!src/**/#header",
				"!package*",
				"!build/*",
				"!src/index.*",
				"!inc/_test-back.php",
				"!inc/_test-back.php",
				`${pkg.name}.php`
			],
			{ base: "../" }
		),
		without_dev
	)
		.pipe(zip(`${pkg.name}-${pkg.version}.zip`))
		.pipe(gulp.dest("_extras/releases"));
});

gulp.task("release", gulp.series("parcel", "version", "zip"));
