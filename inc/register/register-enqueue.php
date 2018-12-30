<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Enqueue the plugin styles and scripts for the post/page editor.
 *
 * @since 1.0.0
 */
function enqueue() {

	do_action( 'ps_before_enqueue' );

	wp_enqueue_style(
		'postsettings',
		BUILD_DIR . 'postsettings.css',
		array(),
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		'postsettings',
		BUILD_DIR . 'postsettings.js',
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

	do_action( 'ps_after_enqueue' );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );
