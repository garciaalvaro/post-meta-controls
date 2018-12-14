<?php
/**
 * Register a reaction post type, with REST API support
 */

namespace POSTSETTINGS;

function ttest() {

	global $post;
	$meta = \get_post_meta( $post->ID );

	var_dump(\get_post_meta( $post->ID, 'ps_image5', false ) );

	// if ( isset( $meta[ 'ps_image2' ] ) ) { print_r( '<br/>ps_image2: ' ); var_dump( $meta[ 'ps_image2' ] ); }
	// if ( isset( $meta[ 'ps_select' ] ) ) { print_r( '<br/>ps_select: ' ); var_dump( $meta[ 'ps_select' ] ); }
	// if ( isset( $meta[ 'ps_select_multiple' ] ) ) { print_r( '<br/>ps_select_multiple: ' ); var_dump( $meta[ 'ps_select_multiple' ] ); }
	// if ( isset( $meta[ 'ps_radio' ] ) ) { print_r( '<br/>ps_radio: ' ); var_dump( $meta[ 'ps_radio' ] ); }
	// if ( isset( $meta[ 'ps_checkbox' ] ) ) { print_r( '<br/>ps_checkbox: ' ); var_dump( $meta[ 'ps_checkbox' ] ); }
	// if ( isset( $meta[ 'ps_text' ] ) ) { print_r( '<br/>ps_text: ' ); var_dump( $meta[ 'ps_text' ] ); }
	// if ( isset( $meta[ 'ps_textarea' ] ) ) { print_r( '<br/>ps_textarea: ' ); var_dump( $meta[ 'ps_textarea' ] ); }
	// if ( isset( $meta[ 'ps_range' ] ) ) { print_r( '<br/>ps_range: ' ); var_dump( $meta[ 'ps_range' ] ); }
	// if ( isset( $meta[ 'ps_range_float' ] ) ) { print_r( '<br/>ps_range_float: ' ); var_dump( $meta[ 'ps_range_float' ] ); }

// var_dump( $meta );

}
// add_action( 'init', __NAMESPACE__ . '\ttest' );
add_action( 'wp_head', __NAMESPACE__ . '\ttest' );
