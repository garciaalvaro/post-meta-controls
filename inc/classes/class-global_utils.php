<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class GlobalUtils
 */
class GlobalUtils {

	use Meta, Sanitize;

	private function get_meta(
		$type = '',
		$meta_key = '',
		$post_id = '',
		$is_single = true
	) {

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
			$exists = $this->meta_key_exists( $post_id, $meta_key );

			if ( false === $exists ) {
				return false;
			}
		}

		return $value;
	}

	public function get_buttons(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'buttons', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_id( $meta );

		return $meta;
	}

	public function get_checkbox(
		$meta_key = '',
		$post_id = '',
		$default_value = ''
	) {

		$meta = $this->get_meta( 'checkbox', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = '1' === $meta ? true : false;

		return $meta;
	}

	public function get_checkbox_multiple(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'checkbox_multiple', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta       = $this->sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $value ) {
			$value = $this->sanitize_id( $value );

			if ( '' !== $value ) {
				$meta_clean[] = $value;
			}
		}

		return $meta_clean;
	}

	public function get_color(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$return_string = true
	) {

		$meta = $this->get_meta( 'color', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_color( $meta );

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
				$alpha = $this->sanitize_float( $alpha );
				$alpha = min( 1, $alpha );
				$alpha = 100 * $alpha;
				$alpha = $this->sanitize_integer( $alpha );

			}

			$meta = array(
				'color' => $color,
				'alpha' => $alpha,
			);
		}

		return $meta;
	}

	public function get_date_range(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'date_range', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta       = $this->sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $value ) {
			$value = $this->sanitize_text( $value );

			if ( '' !== $value ) {
				$meta_clean[] = $value;
			}
		}

		return $meta_clean;
	}

	public function get_date_single(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'date_single', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_text( $meta );

		return $meta;
	}

	public function get_image(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_array = true
	) {

		$meta = $this->get_meta( 'image', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_integer( $meta );

		if ( false === $return_array ) {
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

	public function get_image_multiple(
		$meta_key = '',
		$post_id = '',
		$default_value = false,
		$size = 'large',
		$return_array = true
	) {

		$meta = $this->get_meta( 'image_multiple', $meta_key, $post_id, false );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta       = $this->sanitize_array( $meta );
		$meta_clean = array();

		foreach ( $meta as $key => $id ) {
			$id = $this->sanitize_integer( $id );

			if ( 0 !== $id ) {

				if ( false === $return_array ) {

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

	public function get_radio(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'radio', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_id( $meta );

		return $meta;
	}

	public function get_range(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'range', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_integer( $meta );

		return $meta;
	}

	public function get_range_float(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'range_float', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_float( $meta );

		return $meta;
	}

	public function get_select(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'select', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_id( $meta );

		return $meta;
	}

	public function get_text(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'text', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_text( $meta );

		return $meta;
	}

	public function get_textarea(
		$meta_key = '',
		$post_id = '',
		$default_value = false
	) {

		$meta = $this->get_meta( 'textarea', $meta_key, $post_id );

		if ( false === $meta ) {
			return $default_value;
		}

		$meta = $this->sanitize_textarea( $meta );

		return $meta;
	}
}
