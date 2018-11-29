<?php


if ( ! function_exists( 'ps_add_setting_radio' ) ) {
	function ps_add_setting_radio( $props = array() ) {

		if ( ! class_exists( 'POSTSETTINGS\Radio' ) ) {
			return false;
		}

		new POSTSETTINGS\Radio( $props );
	}
}

if ( ! function_exists( 'ps_add_setting_checkbox' ) ) {
	function ps_add_setting_checkbox( $props = array() ) {

		if ( ! class_exists( 'POSTSETTINGS\Checkbox' ) ) {
			return false;
		}

		new POSTSETTINGS\Checkbox( $props );
	}
}

if ( ! function_exists( 'ps_add_sidebar' ) ) {
	function ps_add_sidebar( $props = array() ) {

		if ( ! class_exists( 'POSTSETTINGS\Sidebar' ) ) {
			return false;
		}

		new POSTSETTINGS\Sidebar( $props );
	}
}

if ( ! function_exists( 'ps_add_tab' ) ) {
	function ps_add_tab( $props = array() ) {

		if ( ! class_exists( 'POSTSETTINGS\Tab' ) ) {
			return false;
		}

		new POSTSETTINGS\Tab( $props );
	}
}

if ( ! function_exists( 'ps_add_panel' ) ) {
	function ps_add_panel( $props = array() ) {

		if ( ! class_exists( 'POSTSETTINGS\Panel' ) ) {
			return false;
		}

		new POSTSETTINGS\Panel( $props );
	}
}
