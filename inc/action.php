<?php

namespace POSTSETTINGS;

function add_inline_script() {

	$sidebars = apply_filters( 'ps_add_sidebar', array() );

	if ( empty( $sidebars ) ) {
		return false;
	}

	$js_hook =
		'wp.hooks.addFilter("ps_add_sidebars","qwe",function(sidebars){return sidebars.concat(' .
		\wp_json_encode( $sidebars ) .
		')});';

	\wp_add_inline_script( 'postsettings_js', $js_hook, 'before' );
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\add_inline_script' );
