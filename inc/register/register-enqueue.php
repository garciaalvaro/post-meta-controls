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
			// If wp-block-editor is registered (from WP 5.2)
			// enqueue it. Otherwise enqueue wp-editor.
			isset( $wp_scripts->registered['wp-block-editor'] )
				? 'wp-block-editor'
				: 'wp-editor',
			'wp-components',
			'wp-compose',
			'wp-data',
			'wp-edit-post',
			'wp-element',
			'wp-plugins',
			'wp-hooks',
			'wp-i18n',
			'wp-rich-text',
		),
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);

	do_action( 'pmc_after_enqueue' );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );
