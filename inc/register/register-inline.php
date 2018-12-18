<?php

namespace POSTSETTINGS;

function add_inline_script() {

	$items = array(
		'sidebars' => array(),
		'tabs'     => array(),
		'panels'   => array(),
		'settings' => array(),
	);

	$items = \apply_filters( 'ps_create_sidebar', $items );

	if (
		empty( $items['sidebars'] ) ||
		empty( $items['tabs'] ) ||
		empty( $items['panels'] ) ||
		empty( $items['settings'] )
	) {
		return false;
	}

	$items = array(
		'sidebars' => $items['sidebars'],
		'tabs'     => $items['tabs'],
		'panels'   => $items['panels'],
		'settings' => $items['settings'],
	);

	\wp_localize_script( 'postsettings_js', 'ps_items', $items );
}

\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\add_inline_script', 20 );
