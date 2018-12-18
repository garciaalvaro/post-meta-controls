<?php

namespace POSTSETTINGS;

function sanitize_html_svg( $value ) {
	/* https://wordpress.stackexchange.com/a/316943 | CC BY-SA 3.0 */
	$allowed_svg = array(
		'svg' => array(
			'class'           => true,
			'aria-hidden'     => true,
			'aria-labelledby' => true,
			'role'            => true,
			'width'           => true,
			'height'          => true,
			'stroke-width'    => true,
			'viewbox'         => true,
		),
		'rect' => array(
			'class'        => true,
			'stroke-width' => true,
			'fill'         => true,
			'x'            => true,
			'y'            => true,
		),
		'g'     => array( 'class' => true, 'stroke-width' => true, 'fill' => true ),
		'path'  => array( 'class' => true, 'stroke-width' => true, 'fill' => true, 'd' => true, ),
		'title' => array( 'class' => true, 'title' => true ),
	);
	$value = \wp_kses( $value, $allowed_svg );
	$value = preg_replace( '/ class=("|\')/', ' className$1', $value );
	$value = preg_replace( '/ stroke-width=("|\')/', ' strokeWidth$1', $value );

	return $value;
}

function sanitize_id( $value ) {
	return \sanitize_title( $value );
}

function sanitize_text( $value ) {
	return \sanitize_text_field( $value );
}

function sanitize_textarea( $value ) {
	return \sanitize_textarea_field( $value );
}

function sanitize_float( $value ) {
	return round( abs( floatval( $value ) ), 2 );
}

function sanitize_integer( $value ) {
	return \absint( $value );
}

function sanitize_boolean( $value ) {
	// https://github.com/WPTRT/code-examples/blob/master/customizer/sanitization-callbacks.php
	// return isset( $value ) && true == $value ? "ttt" : "fff";
	return isset( $value ) && true == $value ? true : false;
}

function sanitize_array( $value ) {
	return is_array( $value ) ? $value : array();
}

function sanitize_array_id( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_id( $array_value );
	}

	return $value;
}

function sanitize_array_integer( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_integer( $array_value );
	}

	return $value;
}

function sanitize_array_text( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_text( $array_value );
	}

	return $value;
}

function sanitize_array_array_text( $value ) {
	$value = sanitize_array( $value );

	foreach ( $value as $array_key => $array_value ) {
		$value[ $array_key ] = sanitize_array_text( $array_value );
	}

	return $value;
}

function sanitize_options(
	$value = '',
	$options = array(),
	$default = '',
	$multiple = false
) {

	$value   = \sanitize_key( $value );
	$options = sanitize_array( $options );
	$default = true === $multiple ? '' : sanitize_id( $default );

	$options = array_map( function( $option ) {
		return $option['value'];
	}, $options );

	// If the input is a valid key, return it; otherwise, return the default.
	return in_array( $value, $options ) ? $value : $default;
}

function sanitize_range( $value = 1, $min = 0, $max = 1 ) {

	$value = \absint( $value );
	$min   = \absint( $min );
	$max   = \absint( $max );

	$value = max( $value, $min );
	$value = min( $value, $max );

	return $value;
}

function sanitize_range_float( $value = 1, $min = 0, $max = 1 ) {

	$value = sanitize_float( $value );
	$min   = sanitize_float( $min );
	$max   = sanitize_float( $max );

	$value = max( $value, $min );
	$value = min( $value, $max );

	return (string) $value;
}
