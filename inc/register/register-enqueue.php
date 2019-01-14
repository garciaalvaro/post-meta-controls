<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Enqueue the plugin styles and scripts, and the main function object.
 *
 * @since 1.0.0
 */
function enqueue() {

	do_action( 'pmc_before_enqueue' );

	wp_enqueue_style(
		PLUGIN_NAME,
		BUILD_DIR . PLUGIN_NAME . '.css',
		array(),
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		PLUGIN_NAME,
		BUILD_DIR . PLUGIN_NAME . '.js',
		array(
			'lodash',
			'wp-i18n',
			'wp-compose',
			'wp-element',
			'wp-components',
			'wp-editor',
			'wp-edit-post',
			'wp-plugins',
			'wp-data',
			'wp-rich-text',
			'wp-hooks',
		),
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);

	do_action( 'pmc_after_enqueue' );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );
