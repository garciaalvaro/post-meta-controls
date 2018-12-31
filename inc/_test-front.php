<?php
/**
 * Register a reaction post type, with REST API support
 */

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function ttest() {

	global $post;
	$meta = \get_post_meta( $post->ID );

	unset( $meta['_edit_lock'] );
	unset( $meta['_pingme'] );
	unset( $meta['_encloseme'] );

	global $wp_scripts;
	// var_dump($wp_scripts->do_items());

	// var_dump(\get_post_meta( $post->ID, 'ps_image5', false ) );

	// var_dump(true == 0 ? true : false);
	// var_dump(ps_get_checkbox('ps_checkbox1'));
	// var_dump(ps_get_meta('ps_checkbox1'));
	// print_r(isset( $qqq['qwe']['we'] )?'true':'false');

	// print_r(\absint(true));
	// print_r(\absint(false));
	// print_r("<br/>");
	// print_r(\sanitize_title("my-asdebisu_portfolio_settings"));

	// if ( isset( $meta[ 'ps_image2' ] ) ) { print_r( '<br/>ps_image2: ' ); var_dump( $meta[ 'ps_image2' ] ); }
	// if ( isset( $meta[ 'ps_select' ] ) ) { print_r( '<br/>ps_select: ' ); var_dump( $meta[ 'ps_select' ] ); }
	// if ( isset( $meta[ 'ps_select_multiple' ] ) ) { print_r( '<br/>ps_select_multiple: ' ); var_dump( $meta[ 'ps_select_multiple' ] ); }
	// if ( isset( $meta[ 'ps_radio' ] ) ) { print_r( '<br/>ps_radio: ' ); var_dump( $meta[ 'ps_radio' ] ); }
	// if ( isset( $meta[ 'ps_checkbox' ] ) ) { print_r( '<br/>ps_checkbox: ' ); var_dump( $meta[ 'ps_checkbox' ] ); }
	// if ( isset( $meta[ 'ps_text' ] ) ) { print_r( '<br/>ps_text: ' ); var_dump( $meta[ 'ps_text' ] ); }
	// if ( isset( $meta[ 'ps_textarea' ] ) ) { print_r( '<br/>ps_textarea: ' ); var_dump( $meta[ 'ps_textarea' ] ); }
	// if ( isset( $meta[ 'ps_range' ] ) ) { print_r( '<br/>ps_range: ' ); var_dump( $meta[ 'ps_range' ] ); }
	// if ( isset( $meta[ 'ps_range_float' ] ) ) { print_r( '<br/>ps_range_float: ' ); var_dump( $meta[ 'ps_range_float' ] ); }

var_dump( $meta );

}
// add_action( 'wp_head', __NAMESPACE__ . '\ttest' );

