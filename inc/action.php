<?php

namespace POSTSETTINGS;

function add_inline_script() {

	$post_type = \get_post_type();

	$sidebars = apply_filters( 'ps_add_sidebar', array(), $post_type );

	if ( empty( $sidebars ) ) {
		return false;
	}

	// array_unshift( $sidebars, 'const ps_af = wp.hooks.addFilter;' );

	// $sidebars = implode( '', $sidebars );

	$qqq =
		'wp.hooks.addFilter("ps_add_sidebars","qwe",function(sidebars){return sidebars.concat(' .
		\wp_json_encode( $sidebars ) .
		')});';

	\wp_add_inline_script( 'postsettings_js', $qqq, 'before' );
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\add_inline_script' );
