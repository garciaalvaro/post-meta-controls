<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

use function POSTMETACONTROLS\sanitize_id;
use function POSTMETACONTROLS\sanitize_integer;
use function POSTMETACONTROLS\sanitize_float;
use function POSTMETACONTROLS\sanitize_text;
use function POSTMETACONTROLS\sanitize_array;
use function POSTMETACONTROLS\sanitize_color;

if ( ! function_exists( 'pmc_get_meta' ) ) {
	function pmc_get_meta( $type = '', $meta_key = '', $post_id = '' ) {

		if (
			empty( $meta_key ) ||
			! is_string( $meta_key ) ||
			! is_int( $post_id )
		) {
			return false;// TODO: return null?
		}

		$post_id = '' === $post_id ? get_the_ID() : $post_id;

		switch ( $type ) {
			case 'buttons':
			case 'checkbox':
			case 'color':
			case 'custom_text':
			case 'date_single':
			case 'image':
			case 'radio':
			case 'range':
			case 'range_float':
			case 'select':
			case 'text':
			case 'textarea':
				$value = get_post_meta( $post_id, $meta_key, true );
				break;

			case 'date_range':
			case 'checkbox_multiple':
			case 'image_multiple':
				$value = get_post_meta( $post_id, $meta_key, false );
				break;

			default:
				$value = false;// TODO: return null?
				break;
		}

		// If the value is the same as the one returned by a non-existent meta key
		// we make sure it exists, and if it doesn't we return false.
		if ( '' === $value || ( is_array( $value ) && empty( $value ) ) ) {
			$exists = metadata_exists( 'post', $post_id, $meta_key );

			if ( false === $exists ) {
				return false;
			}
		}

		return $value;
	}
}

if ( ! function_exists( 'pmc_get_buttons' ) ) {
	function pmc_get_buttons( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'buttons', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_checkbox' ) ) {
	function pmc_get_checkbox( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'checkbox', $meta_key, $post_id );

		if ( false === $meta ) {
			return '';// What should return, null?
		}

		$meta = '1' === $meta ? true : false;

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_checkbox_multiple' ) ) {
	function pmc_get_checkbox_multiple( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'checkbox_multiple', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta       = sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $value ) {
			$value = sanitize_id( $value );

			if ( '' !== $value ) {
				$meta_clean[] = $value;
			}
		}

		return $meta_clean;
	}
}

if ( ! function_exists( 'pmc_get_color' ) ) {
	function pmc_get_color( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'color', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_color( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_custom_text' ) ) {
	function pmc_get_custom_text( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'custom_text', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_text( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_date_range' ) ) {
	function pmc_get_date_range( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'date_range', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta       = sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $value ) {
			$meta_clean[] = sanitize_text( $value );
		}

		return $meta_clean;
	}
}

if ( ! function_exists( 'pmc_get_date_single' ) ) {
	function pmc_get_date_single( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'date_single', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_text( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_image' ) ) {
	function pmc_get_image( $meta_key = '', $post_id = '', $size = 'large' ) {

		$meta = pmc_get_meta( 'image', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_integer( $meta );
		$meta = wp_get_attachment_image_src( $meta, $size );// If not found returns false.

		if ( false === $meta ) {
			return false;
		}

		$image = array(
			'url'    => $meta[0],
			'width'  => $meta[1],
			'height' => $meta[2],
		);

		return $image;
	}
}

if ( ! function_exists( 'pmc_get_image_multiple' ) ) {
	function pmc_get_image_multiple( $meta_key = '', $post_id = '', $size = 'large' ) {

		$meta = pmc_get_meta( 'image_multiple', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta       = sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $id ) {
			$id = sanitize_integer( $id );

			if ( 0 !== $id ) {
				$image = wp_get_attachment_image_src( $id, $size );

				if ( false !== $image ) {
					$meta_clean[ $id ] = array(
						'url'    => $image[0],
						'width'  => $image[1],
						'height' => $image[2],
					);
				}
			}
		}

		return $meta_clean;
	}
}

if ( ! function_exists( 'pmc_get_radio' ) ) {
	function pmc_get_radio( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'radio', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_range' ) ) {
	function pmc_get_range( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'range', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_integer( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_range_float' ) ) {
	function pmc_get_range_float( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'range_float', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_float( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_select' ) ) {
	function pmc_get_select( $meta_key = '', $post_id = '', $single = true ) {

		$meta = pmc_get_meta( 'select', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_text' ) ) {
	function pmc_get_text( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'text', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_text( $meta );
		// $meta = (string) $meta;

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_textarea' ) ) {
	function pmc_get_textarea( $meta_key = '', $post_id = '' ) {

		$meta = pmc_get_meta( 'textarea', $meta_key, $post_id );

		if ( false === $meta ) {
			return false;
		}

		$meta = sanitize_textarea( $meta );
		// $meta = (string) $meta;

		return $meta;
	}
}
