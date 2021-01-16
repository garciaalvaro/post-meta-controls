const copyfiles = require("copyfiles");

const { name } = require("../package.json");

// Copy files to the _release folder
copyfiles(
	["dist/*", "inc/**/*", "README.txt", "LICENSE", `${name}.php`, "_release"],
	{},
	() => null
);
