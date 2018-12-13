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

function get_meta_arg_type( $type = '' ) {

	switch ( $type ) {
		case 'checkbox':
			return 'boolean';
			break;

		case 'image':
		case 'range':
			return 'integer';
			break;

		default:
			return 'string';
			break;
	}
}

function get_meta_arg_single( $type = '', $props = array() ) {

	$multiple =
		( 'select' === $type || 'image' === $type ) &&
		true === $props['multiple'];

	return false === $multiple;
}

function get_meta_arg_sanitize( $type = '', $props = array() ) {

	switch ( $type ) {
		case 'checkbox':
			return __NAMESPACE__ . '\sanitize_boolean';
			break;

		case 'text':
		case 'color':
			return '\sanitize_text_field';
			break;

		case 'textarea':
			return '\sanitize_textarea_field';
			break;

		case 'image':
			return '\absint';
			break;

		case 'range':
			$min = $props['min'];
			$max = $props['max'];
			return function ( $value ) use( $min, $max ) {
				return sanitize_range( $value, $min, $max );
			};
			break;

		case 'range_float':
			$min = $props['min'];
			$max = $props['max'];
			return function ( $value ) use( $min, $max ) {
				return sanitize_range_float( $value, $min, $max );
			};
			break;

		case 'radio':
		case 'select':
			$options  = $props['options'];
			$default  = $props['default_value'];
			$multiple = 'select' === $type && true === $props['multiple'];
			return function ( $value ) use( $options, $default ) {
				return sanitize_options( $value, $options, $default, $multiple );
			};
			break;

		default:
			return '\sanitize_text_field';
			break;
	}
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
