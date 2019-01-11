<?php
/**
 * Register a reaction post type, with REST API support
 */

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ttest() {

	global $post;
	$post_id = $post->ID;
	// $meta = \get_post_meta( $post_id );

	// unset( $meta['_edit_lock'] );
	// unset( $meta['_pingme'] );
	// unset( $meta['_encloseme'] );

	// var_dump( $meta );

	// var_dump( get_post_meta( $post_id, 'range_float_key' ) );

	var_dump( pmc_get_buttons( 'buttons_key', $post_id ) );
	var_dump( pmc_get_checkbox( 'checkbox_key', $post_id ) );
	var_dump( pmc_get_checkbox_multiple( 'checkbox_multiple_key', $post_id ) );
	var_dump( pmc_get_color( 'color_key', $post_id ) );
	var_dump( pmc_get_custom_text( 'custom_text_key', $post_id ) );
	var_dump( pmc_get_date( 'date_key', $post_id ) );
	var_dump( pmc_get_image( 'image_key', $post_id ) );
	var_dump( pmc_get_image_multiple( 'image_multiple_key', $post_id ) );
	var_dump( pmc_get_radio( 'radio_key', $post_id ) );
	var_dump( pmc_get_range( 'range_key', $post_id ) );
	var_dump( pmc_get_range_float( 'range_float_key', $post_id ) );
	var_dump( pmc_get_select( 'select_key', $post_id ) );
	var_dump( pmc_get_text( 'text_key', $post_id ) );
	var_dump( pmc_get_textarea( 'textarea_key', $post_id ) );

}
add_action( 'wp_head', __NAMESPACE__ . '\ttest' );

