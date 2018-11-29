<?php
/**
 * Register a reaction post type, with REST API support
 */

namespace POSTSETTINGS;

function ttest() {

	global $post;
	print_r( \get_post_meta($post->ID) );
	// update_post_meta( $post->ID, 'radio_c', 'pp' );

}
// add_action( 'init', __NAMESPACE__ . '\ttest' );
add_action( 'wp_head', __NAMESPACE__ . '\ttest' );
