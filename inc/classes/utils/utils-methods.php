<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function register_meta( $setting_instances = array() ) {

	$data_key_array = array();

	foreach ( $setting_instances as $setting_instance ) {

		$type = $setting_instance->get_setting_type();

		if ( 'date_range' === $type || 'date_single' === $type ) {
			$setting_instance->enqueue_locale();
		}

		$data_key = $setting_instance->get_data_key_with_prefix();

		// We only register the first setting with a certain meta_key,
		// but let it be modified with several controls inside js.
		if ( ! in_array( $data_key, $data_key_array ) ) {

			$setting_instance->register_meta();

			$data_key_array[] = $data_key;

		}
	}
}

function get_props( $instances = array(), $post_type_current = '' ) {

	$props_array = array();

	foreach ( $instances as $instance ) {

		$post_type = $instance->get_post_type();

		if (
			empty( $post_type ) ||
			( is_array( $post_type ) && in_array( $post_type_current, $post_type ) ) ||
			$post_type_current === $post_type
		) {
			$props_array[] = $instance->get_props_for_js();
		}
	}

	return $props_array;
}

function set_metadata_exists( $setting_instances = array() ) {

	foreach ( $setting_instances as $setting_instance ) {

		$setting_instance->set_metadata_exists();

	}
}
