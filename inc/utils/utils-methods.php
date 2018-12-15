<?php

namespace POSTSETTINGS;


function setting_register_meta( $setting_instances = array() ) {

	\add_action( 'init', function() use ( $setting_instances ) {

		foreach ( $setting_instances as $setting_instance ) {

			$setting_instance->register_meta();

		}
	});
}

function get_props( $class_instances = array() ) {

	$props = array();

	foreach ( $class_instances as $class_instance ) {

		$props[] = $class_instance->get_props_for_js();

	}

	return $props;
}

function setting_set_metadata_exists( $setting_instances = array() ) {

	foreach ( $setting_instances as $setting_instance ) {

		$setting_instance->set_metadata_exists();

	}
}
