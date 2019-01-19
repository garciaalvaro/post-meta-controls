<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

use POSTMETACONTROLS\GlobalUtils;

if ( ! function_exists( 'pmc_get_buttons' ) ) {
	function pmc_get_buttons( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_buttons( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_checkbox' ) ) {
	function pmc_get_checkbox( $meta_key = '', $post_id = '', $default_value = '' ) {
		return (new GlobalUtils)->get_checkbox( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_checkbox_multiple' ) ) {
	function pmc_get_checkbox_multiple( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_checkbox_multiple( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_color' ) ) {
	function pmc_get_color(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$return_string = true
	) {
		return (new GlobalUtils)->get_image(
			$meta_key,
			$post_id,
			$default_value,
			$return_string
		);
	}
}

if ( ! function_exists( 'pmc_get_date_range' ) ) {
	function pmc_get_date_range( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_date_range( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_date_single' ) ) {
	function pmc_get_date_single( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_date_single( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_image' ) ) {
	function pmc_get_image(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_array = true
	) {
		return (new GlobalUtils)->get_image(
			$meta_key,
			$post_id,
			$default_value,
			$size,
			$return_array
		);
	}
}

if ( ! function_exists( 'pmc_get_image_multiple' ) ) {
	function pmc_get_image_multiple(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_array = true
	) {
		return (new GlobalUtils)->get_image_multiple(
			$meta_key,
			$post_id,
			$default_value,
			$size,
			$return_array
		);
	}
}

if ( ! function_exists( 'pmc_get_radio' ) ) {
	function pmc_get_radio( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_radio( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_range' ) ) {
	function pmc_get_range( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_range( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_range_float' ) ) {
	function pmc_get_range_float( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_range_float( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_select' ) ) {
	function pmc_get_select( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_select( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_text' ) ) {
	function pmc_get_text( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_text( $meta_key, $post_id, $default_value );
	}
}

if ( ! function_exists( 'pmc_get_textarea' ) ) {
	function pmc_get_textarea( $meta_key = '', $post_id = '', $default_value = false ) {
		return (new GlobalUtils)->get_textarea( $meta_key, $post_id, $default_value );
	}
}
