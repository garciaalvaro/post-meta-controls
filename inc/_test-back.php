<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function my_function( $sidebars ) {

	update_post_meta( 2918, 'qqq', 'bbb' );

}

// add_filter( 'admin_init', __NAMESPACE__ . '\my_function' );

function qregister_meta(){

	register_post_meta( 'post', 'qqq', array(
		'show_in_rest'      => true,
		'single'            => false,
		'type'              => 'string',
		'sanitize_callback' => function( $value ) {

			// wp_die( 'Invalid value, go back and try again.' );
			// return $value.'q';

		},
	) );

}

// add_filter( 'init', __NAMESPACE__ . '\qregister_meta' );
