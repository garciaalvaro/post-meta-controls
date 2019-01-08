<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

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
	$multiple = 'multi_checkbox' === $type ? true : $multiple;

	return false === $multiple;
}

function get_meta_arg_sanitize( $type = '', $props = array() ) {

	switch ( $type ) {
		case 'checkbox':
			return __NAMESPACE__ . '\sanitize_boolean';
			break;

		// case 'text':
		// case 'color':
		// 	return __NAMESPACE__ . '\sanitize_text';
		// 	break;

		case 'textarea':
			return __NAMESPACE__ . '\sanitize_textarea';
			break;

		case 'image':
			return '\absint';
			break;

		case 'range':
			$min = $props['min'];
			$max = $props['max'];
			return function ( $value ) use ( $min, $max ) {
				return sanitize_range( $value, $min, $max );
			};
			break;

		case 'range_float':
			$min = $props['min'];
			$max = $props['max'];
			return function ( $value ) use ( $min, $max ) {
				return sanitize_range_float( $value, $min, $max );
			};
			break;

		case 'buttons':
		case 'radio':
		case 'select':
			$options  = $props['options'];
			$default  = $props['default_value'];
			$multiple = 'select' === $type && true === $props['multiple'];
			return function ( $value ) use ( $options, $default ) {
				return sanitize_options( $value, $options, $default, $multiple );
			};
			break;

		default:
			return __NAMESPACE__ . '\sanitize_text';
			break;
	}
}
