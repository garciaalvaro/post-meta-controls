<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Get the meta type given the setting type.
 *
 * @since 1.0.0
 */
function get_meta_type( $setting_type = '' ) {

	switch ( $setting_type ) {
		case 'checkbox':
			return 'boolean';
			break;

		case 'range_float':
			return 'number';
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

/**
 * Get the meta single property value given the setting type.
 *
 * @since 1.0.0
 */
function get_meta_single( $setting_type = '' ) {

	if (
		'date_range' === $setting_type ||
		'checkbox_multiple' === $setting_type ||
		'image_multiple' === $setting_type
	) {
		return false;
	}

	return true;
}

/**
 * Get the meta sanitize callback function.
 *
 * @since 1.0.0
 */
function get_meta_sanitize( $props = array() ) {

	switch ( $props['type'] ) {
		case 'checkbox':
			return __NAMESPACE__ . '\sanitize_checkbox';
			break;

		case 'textarea':
			return __NAMESPACE__ . '\sanitize_textarea';
			break;

		case 'image':
		case 'image_multiple':
			return function ( $value ) {
				if ( '0' === $value ) {
					return '';
				}

				return \absint( $value );
			};
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
			$options       = $props['options'];
			$default_value = 'checkbox_multiple' === $props['type']
				? ''
				: $props['default_value'];

			return function ( $value ) use ( $options, $default_value ) {
				return sanitize_options( $value, $options, $default_value );
			};
			break;

		default:
			return __NAMESPACE__ . '\sanitize_text';
			break;
	}
}
