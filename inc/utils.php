<?php

namespace POSTSETTINGS;

function validate_conditions( $conditions, $prop_key, $props ) {

	if ( is_string( $conditions ) && 'not_empty' === $conditions ) {
		if ( empty( $props[ $prop_key ] ) ) {
			return false;
		}

		return true;
	}

	if ( is_array( $conditions ) ) {

		foreach ( $conditions as $condition ) {

			$operator = $condition['operator'];
			$arg_1    = $props[ $condition['argument_1'] ];
			$arg_2    = true === $condition['argument_2_is_prop']
				? $props[ $condition['argument_2'] ]
				: $condition['argument_2'];

			switch ( $operator ) {
				case 'greater_than':
					return $arg_1 > $arg_2;
				default:
					break;
			}
		}
	}

	return false;
}

function validate_required( $required, $prop ) {
	$exists = isset( $prop );

	return ! $required || $exists;
}

function get_meta_type( $props = array() ) {

	if ( 'checkbox' === $props['type'] ) {
		return 'boolean';
	} elseif (
		'range' === $props['type'] &&
		isset( $props['float_number'] ) &&
		false === $props['float_number']
	) {
		return 'integer';
	}

	return 'string';
}

function set_schema(
	$schema = array(),
	$required_keys = array(),
	$private_keys = array(),
	$conditions = array()
) {

	foreach ( $schema as $key => $prop_array ) {
		$prop_array['required'] = in_array( $key, $required_keys );
		$prop_array['private']  = in_array( $key, $private_keys );

		if ( array_key_exists( $key, $conditions ) ) {
			$prop_array['conditions'] = $conditions[ $key ];
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

function sanitize_float( $value ) {
	return abs( floatval( $value ) );
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

function sanitize_options( $value, $options, $default, $multiple = false ) {

	$value = true === $multiple
		? json_decode( $value, true )
		: \sanitize_key( $value );
	$options = sanitize_array( $options );

	// Get list of choices from the control associated with the setting.
	$options = array_map( function( $option ) {
		return $option['value'];
	}, $options );

	if ( true === $multiple && is_array( $value ) ) {

		foreach ( $value as $value_key => $value_value ) {
			if ( ! in_array( $value_value, $options ) ) {
				unset( $value[ $value_key ] );
			}
		}

		return empty( $value )
			? sanitize_id( $default )
			: wp_json_encode( array_values( $value ) );
	}

	// If the input is a valid key, return it; otherwise, return the default.
	return in_array( $value, $options ) ? $value : sanitize_id( $default );
}

function sanitize_range( $value = 1, $props = array() ) {

	$min = $props['min'];
	$max = $props['max'];

	if ( true === $props['float_number'] ) {
		$value = sanitize_float( $value );
		$min   = sanitize_float( $min );
		$max   = sanitize_float( $max );
	} else {
		$value = sanitize_integer( $value );
		$min   = sanitize_integer( $min );
		$max   = sanitize_integer( $max );
	}

	$value = max( $value, $min );
	$value = min( $value, $max );

	return $value;
}
