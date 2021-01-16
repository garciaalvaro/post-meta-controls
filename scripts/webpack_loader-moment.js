module.exports = source => {
	const sourceModified = source.replace(
		/^[\S\s]*?}\(this, \(([\S\s]*?)}\)\)\);/g,

		[
			`window.wp.hooks.addAction( "postMetaControls.addMomentLocale", "addMomentLocale", `,
			`$1`,
			`});`,
		].join("")
	);

	return sourceModified;
};
