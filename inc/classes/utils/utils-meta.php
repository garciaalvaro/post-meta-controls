<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function get_meta_type( $type = '' ) {

	switch ( $type ) {
		case 'checkbox':
			return 'boolean';
			break;

		case 'image':
		case 'image_multiple':
		case 'range':
			return 'integer';
			break;

		default:
			return 'string';
			break;
	}
}

function get_meta_single( $type = '' ) {

	if ( 'checkbox_multiple' === $type || 'image_multiple' === $type ) {
		return false;
	}

	return true;
}

function get_meta_sanitize( $type = '', $props = array() ) {

	switch ( $type ) {
		case 'checkbox':
			return __NAMESPACE__ . '\sanitize_boolean';
			break;

		case 'textarea':
			return __NAMESPACE__ . '\sanitize_textarea';
			break;

		case 'image':
		case 'image_multiple':
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
		case 'checkbox_multiple':
			$options     = $props['options'];
			$default     = $props['default_value'];
			$is_multiple = 'checkbox_multiple' === $props['type'];
			return function ( $value ) use ( $options, $default ) {
				return sanitize_options( $value, $options, $default, $is_multiple );
			};
			break;

		default:
			return __NAMESPACE__ . '\sanitize_text';
			break;
	}
}
