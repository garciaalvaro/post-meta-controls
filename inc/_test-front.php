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
	$meta = \get_post_meta( $post_id, 'qqq' );
	// $meta=get_post_custom_keys( $post_id );

	unset( $meta['_edit_lock'] );
	unset( $meta['_pingme'] );
	unset( $meta['_encloseme'] );

	// print_r('<br>buttons_key: '); var_dump( pmc_get_buttons( 'buttons_key', $post_id, 'pepe' ) );
	// print_r('<br>checkbox_key: '); var_dump( pmc_get_checkbox( 'checkbox_key', $post_id, 'pepe' ) );
	// print_r('<br>checkbox_multiple_key: '); var_dump( pmc_get_checkbox_multiple( 'checkbox_multiple_key1', $post_id, 'pepe' ) );
	// print_r('<br>color_key: '); var_dump( pmc_get_color( 'color_key', $post_id,true, 'pepe' ) );
	print_r('<br>date_range_key: '); var_dump( pmc_get_date_range( 'date_range_key', $post_id, 'pepe' ) );
	print_r('<br>date_single_key: '); var_dump( pmc_get_date_single( 'date_single_key', $post_id, 'pepe' ) );
	// print_r('<br>image_key: '); var_dump( pmc_get_image( 'image_key', $post_id, 'large', 'pepe' ) );
	// print_r('<br>image_multiple_key: '); var_dump( pmc_get_image_multiple( 'image_multiple_key1', $post_id, 'large', 'pepe' ) );
	// print_r('<br>radio_key: '); var_dump( pmc_get_radio( 'radio_key', $post_id, 'pepe' ) );
	// print_r('<br>range_key: '); var_dump( pmc_get_range( 'range_key', $post_id, 'pepe' ) );
	// print_r('<br>range_float_key: '); var_dump( pmc_get_range_float( 'range_float_key', $post_id, 'pepe' ) );
	// print_r('<br>select_key: '); var_dump( pmc_get_select( 'select_key', $post_id, 'pepe' ) );
	// print_r('<br>text_key: '); var_dump( pmc_get_text( 'text_key', $post_id, 'pepe' ) );
	// print_r('<br>textarea_key: '); var_dump( pmc_get_textarea( 'textarea_key', $post_id, 'pepe' ) );

}
add_action( 'wp_head', __NAMESPACE__ . '\ttest' );
// function qq(){

// 	\register_post_meta(
// 		'post',
// 		'ttt',
// 		array(
// 			'show_in_rest'      => true,
// 			'single'            => true,
// 			'type'              => 'integer',
// 			'sanitize_callback' => 'absint',
// 		)
// 	);

// }
// add_action( 'init', __NAMESPACE__ . '\qq' );

