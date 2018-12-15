<?php

if ( ! function_exists( 'ps_create_sidebar' ) ) {
	function ps_create_sidebar( $raw_props = array() ) {

		if ( ! function_exists( 'POSTSETTINGS\create_sidebar' ) ) {
			return false;
		}

		POSTSETTINGS\create_sidebar( $raw_props );
	}

	do_action( 'ps_init' );
}
