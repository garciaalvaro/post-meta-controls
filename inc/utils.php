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
