<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function cast_schema( $elements = array(), $schema = array() ) {

	foreach ( $elements as $key => $value ) {

		if ( isset( $schema[ $key ]['type'] ) ) {
			$type = $schema[ $key ]['type'];
		} elseif ( isset( $schema[ $key ] ) ) {
			$type = $schema[ $key ];
		} elseif ( isset( $schema['_all'] ) ) {
			$type = $schema['_all'];
		} else {
			unset( $elements[ $key ] );
			continue;
		}

		if ( is_array( $type ) ) {
			$value = cast_array( $value );

			$elements[ $key ] = cast_schema( $value, $type );
			continue;
		}

		switch ( $type ) {
			case 'string':
				$elements[ $key ] = sanitize_string( $value );
				break;

			case 'html':
				$elements[ $key ] = sanitize_html( $value );
				break;

			case 'html_svg':
				$elements[ $key ] = sanitize_html_svg( $value );
				break;

			case 'id':
				$elements[ $key ] = sanitize_id( $value );
				break;

			case 'text':
				$elements[ $key ] = sanitize_text( $value );
				break;

			case 'float':
				$elements[ $key ] = sanitize_float( $value );
				break;

			case 'integer':
				$elements[ $key ] = sanitize_integer( $value );
				break;

			case 'boolean':
				$elements[ $key ] = sanitize_boolean( $value );
				break;

			default:
				$elements[ $key ] = '';
				break;
		}
	}

	return $elements;
}
