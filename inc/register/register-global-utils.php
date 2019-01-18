<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

use function POSTMETACONTROLS\sanitize_id;
use function POSTMETACONTROLS\sanitize_integer;
use function POSTMETACONTROLS\sanitize_float;
use function POSTMETACONTROLS\sanitize_text;
use function POSTMETACONTROLS\sanitize_textarea;
use function POSTMETACONTROLS\sanitize_array;
use function POSTMETACONTROLS\sanitize_color;
use function POSTMETACONTROLS\meta_key_exists;

if ( ! function_exists( 'pmc_get_meta' ) ) {
	function pmc_get_meta( $type = '', $meta_key = '', $post_id = '', $is_single = true ) {

		if (
			empty( $meta_key ) ||
			( ! is_string( $meta_key ) && ! is_int( $post_id ) )
		) {
			return false;
		}

		$post_id = '' === $post_id ? get_the_ID() : $post_id;
		$types   = array(
			'buttons',
			'checkbox',
			'checkbox_multiple',
			'color',
			'custom_text',
			'date_range',
			'date_single',
			'image',
			'image_multiple',
			'radio',
			'range',
			'range_float',
			'select',
			'text',
			'textarea',
		);

		if ( ! in_array( $type, $types ) ) {
			return false;
		}

		$value = get_post_meta( $post_id, $meta_key, $is_single );

		// If the value is the same as the one returned by a non-existent meta key
		// we make sure it exists, and if it doesn't we return false.
		if ( '' === $value || ( is_array( $value ) && empty( $value ) ) ) {
			$exists = meta_key_exists( $post_id, $meta_key );

			if ( false === $exists ) {
				return false;
			}
		}

		return $value;
	}
}

if ( ! function_exists( 'pmc_get_buttons' ) ) {
	function pmc_get_buttons( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'buttons', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_checkbox' ) ) {
	function pmc_get_checkbox( $meta_key = '', $post_id = '', $default_value = '' ) {

		$meta = pmc_get_meta( 'checkbox', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = '1' === $meta ? true : false;

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_checkbox_multiple' ) ) {
	function pmc_get_checkbox_multiple( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'checkbox_multiple', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
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
	function pmc_get_color(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$return_string = true
	) {

		$meta = pmc_get_meta( 'color', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_color( $meta );

		if ( false === $return_string ) {

			$color = $meta;
			$alpha = 100;

			// https://stackoverflow.com/a/31245990 | CC BY-SA 3.0
			$regex_rgb_rgba = '/rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/';

			// https://stackoverflow.com/a/9586150 | CC BY-SA 3.0
			$regex_rgb = '/rgb\(\s*?(\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\s*?\)/';

			if (
				false == preg_match( $regex_rgb, $color ) &&
				true == preg_match( $regex_rgb_rgba, $color )
			) {

				$alpha = preg_replace( '/(.*?,\s?)(\d+(\.?\d+)?)(\s*?\))/', '$2', $color );
				$color = preg_replace( '/(rgb)(a)(.*?)(,\s?\d+(\.?\d+)?)(\s*?\))/', '$1$3$6', $color );
				$alpha = sanitize_float( $alpha );
				$alpha = min( 1, $alpha );
				$alpha = 100 * $alpha;
				$alpha = sanitize_integer( $alpha );

			}

			$meta = array(
				'color' => $color,
				'alpha' => $alpha,
			);
		}

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_date_range' ) ) {
	function pmc_get_date_range( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'date_range', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta       = sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $value ) {
			$value = sanitize_text( $value );

			if ( '' !== $value ) {
				$meta_clean[] = $value;
			}
		}

		return $meta_clean;
	}
}

if ( ! function_exists( 'pmc_get_date_single' ) ) {
	function pmc_get_date_single( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'date_single', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_text( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_image' ) ) {
	function pmc_get_image(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_id = false
	) {

		$meta = pmc_get_meta( 'image', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_integer( $meta );

		if ( true === $return_id ) {
			return $meta;
		}

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
	function pmc_get_image_multiple(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_id = false
	) {

		$meta = pmc_get_meta( 'image_multiple', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta       = sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $id ) {
			$id = sanitize_integer( $id );

			if ( 0 !== $id ) {

				if ( true === $return_id ) {

					$meta_clean[] = $id;

				} else {

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
		}

		return $meta_clean;
	}
}

if ( ! function_exists( 'pmc_get_radio' ) ) {
	function pmc_get_radio( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'radio', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_range' ) ) {
	function pmc_get_range( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'range', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_integer( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_range_float' ) ) {
	function pmc_get_range_float( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'range_float', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_float( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_select' ) ) {
	function pmc_get_select( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'select', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_text' ) ) {
	function pmc_get_text( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'text', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_text( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'pmc_get_textarea' ) ) {
	function pmc_get_textarea( $meta_key = '', $post_id = '', $default_value = false ) {

		$meta = pmc_get_meta( 'textarea', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = sanitize_textarea( $meta );

		return $meta;
	}
}
