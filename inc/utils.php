<?php

namespace POSTSETTINGS;

function get_meta_type( $setting_type = '' ) {
	if ( 'checkbox' === $setting_type ) {
		return 'boolean';
	}

	return 'string';
}

function set_schema(
	$schema = array(),
	$required_keys = array(),
	$private_keys = array(),
	$non_empty_values = array()
) {

	foreach ( $schema as $key => $prop_array ) {
		$prop_array['required'] = in_array( $key, $required_keys );
		$prop_array['private']  = in_array( $key, $private_keys );

		if ( in_array( $key, $non_empty_values ) ) {
			$prop_array['can_be_empty'] = false;
		} elseif ( array_key_exists( $key, $non_empty_values ) ) {
			$prop_array['can_be_empty'] = $non_empty_values[ $key ];
		} else {
			$prop_array['can_be_empty'] = true;
		}

		$schema[ $key ] = $prop_array;
	}

	return $schema;
};

function sanitize_id( $value ) {
	return \sanitize_title( $value );
}

function sanitize_text( $value ) {
	return \sanitize_text_field( $value );
}

function sanitize_integer( $value ) {
	return \absint( $value );
}

function sanitize_bool( $value ) {
	// https://github.com/WPTRT/code-examples/blob/master/customizer/sanitization-callbacks.php
	return isset( $value ) && true == $value ? true : false;
}

function sanitize_array( $value ) {
	return is_array( $value ) ? $value : array();
}

function sanitize_array_string( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_text( $array_value );
	}

	return $value;
}

function sanitize_array_array_string( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_array_string( $array_value );
	}

	return $value;
}

function sanitize_options( $value, $options, $default ) {

	// Ensure input is a slug.
	$value = \sanitize_key( $value );

	// Get list of choices from the control associated with the setting.
	$options = array_map( function( $option ) {
		return $option['value'];
	}, $options );

	// If the input is a valid key, return it; otherwise, return the default.
	return in_array( $value, $options ) ? $value : $default;
}
