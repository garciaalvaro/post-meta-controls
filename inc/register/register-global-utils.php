<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

use POSTMETACONTROLS\GlobalUtils;

if ( ! function_exists( 'pmc_get_buttons' ) ) {
	function pmc_get_buttons( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'buttons',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_checkbox' ) ) {
	function pmc_get_checkbox( $meta_key = '', $post_id = '', $default_value = '' ) {
		$props = array(
			'type'          => 'checkbox',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_checkbox_multiple' ) ) {
	function pmc_get_checkbox_multiple( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'checkbox_multiple',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_color' ) ) {
	function pmc_get_color(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$return_string = true
	) {
		$props = array(
			'type'          => 'color',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
			'return_string' => $return_string,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_date_range' ) ) {
	function pmc_get_date_range( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'date_range',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_date_single' ) ) {
	function pmc_get_date_single( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'date_single',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
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
		$props = array(
			'type'          => 'image',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
			'size'          => $size,
			'return_array'  => $return_array,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
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
		$props = array(
			'type'          => 'image_multiple',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
			'size'          => $size,
			'return_array'  => $return_array,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_radio' ) ) {
	function pmc_get_radio( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'radio',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_range' ) ) {
	function pmc_get_range( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'range',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_range_float' ) ) {
	function pmc_get_range_float( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'range_float',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_select' ) ) {
	function pmc_get_select( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'select',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_text' ) ) {
	function pmc_get_text( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'text',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}

if ( ! function_exists( 'pmc_get_textarea' ) ) {
	function pmc_get_textarea( $meta_key = '', $post_id = '', $default_value = false ) {
		$props = array(
			'type'          => 'textarea',
			'meta_key'      => $meta_key,
			'post_id'       => $post_id,
			'default_value' => $default_value,
		);
		$instance = new GlobalUtils( $props );
		return $instance->get_value();
	}
}
