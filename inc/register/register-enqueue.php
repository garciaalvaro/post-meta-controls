<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Enqueue the plugin styles and scripts, and the main function object.
 *
 * @since 1.0.0
 */
add_action("enqueue_block_editor_assets", __NAMESPACE__ . '\enqueue');
function enqueue()
{
	do_action("pmc_before_enqueue");

	wp_enqueue_style(
		PLUGIN_NAME,
		DIST_DIR . PLUGIN_NAME . ".css",
		[],
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		PLUGIN_NAME,
		DIST_DIR . PLUGIN_NAME . ".js",
		[
			"lodash",
			"moment",
			"wp-api-fetch",
			"wp-block-editor",
			"wp-components",
			"wp-compose",
			"wp-data",
			"wp-edit-post",
			"wp-editor",
			"wp-element",
			"wp-hooks",
			"wp-i18n",
			"wp-plugins",
			"wp-url",
		],
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);
}
