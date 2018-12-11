<?php

namespace POSTSETTINGS;

function add_inline_script() {

	$ps = array(
		'sidebars' => array(),
		'tabs'     => array(),
		'panels'   => array(),
		'settings' => array(),
	);

	$ps = apply_filters( 'ps_add_sidebars', $ps );

	if ( empty( $ps['sidebars'] ) ) {
		return false;
	}

	$js_hook =
		'wp.hooks.addFilter("ps_add_sidebars","qwe",function(ps){' .
			'return ps.concat(' . \wp_json_encode( $ps ) . ');' .
		'});';

	\wp_add_inline_script( 'postsettings_js', $js_hook, 'before' );
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\add_inline_script' );
