<?php

if ( ! function_exists( 'ps_create_sidebar' ) ) {
	function ps_create_sidebar( $raw_props = array() ) {

		if ( ! function_exists( 'POSTSETTINGS\create_sidebar' ) ) {
			return false;
		}

		POSTSETTINGS\create_sidebar( $raw_props );
	}

	add_action( 'init', function() {
		do_action( 'ps_init' );
	});
}

if ( ! function_exists( 'ps_get_meta' ) ) {
	function ps_get_meta( $key = '', $post_id = '', $single = false ) {

		if ( empty( $key ) || ! is_string( $key ) ) {
			return false;
		}

		$post_id = '' !== $post_id && is_string( $key )
			? $post_id
			: get_the_ID();

		// $meta_exists = \metadata_exists( 'post', $post_id, $key );

		$meta = get_post_meta( $post_id, $key, $single );

		return $meta;
	}
}

if ( ! function_exists( 'ps_get_radio' ) ) {
	function ps_get_radio( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );

		return POSTSETTINGS\sanitize_id( $meta );
	}
}

if ( ! function_exists( 'ps_get_checkbox' ) ) {
	function ps_get_checkbox( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );
		$meta = '1' === $meta ? true : false;

		return $meta;
	}
}
//single
if ( ! function_exists( 'ps_get_image' ) ) {
	function ps_get_image( $key = '', $size = 'large', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, false );
		$meta = is_array( $meta )
			? POSTSETTINGS\sanitize_array_integer( $meta )
			: POSTSETTINGS\sanitize_integer( $meta );

		if ( is_array( $meta ) ) {
			$image = array();

			foreach ( $meta as $image_id ) {
				$image[] = wp_get_attachment_image( $image_id, $size );
			}
		} else {
			$image = wp_get_attachment_image( $meta, $size );
		}

		return $image;
	}
}

if ( ! function_exists( 'ps_get_image_data' ) ) {
	function ps_get_image_data( $key = '', $size = 'large', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, false );
		$meta = is_array( $meta )
			? POSTSETTINGS\sanitize_array_integer( $meta )
			: POSTSETTINGS\sanitize_integer( $meta );

		if ( is_array( $meta ) ) {
			$image = array();

			foreach ( $meta as $image_id ) {
				$image[] = wp_get_attachment_image_src( $image_id, $size );
			}
		} else {
			$image = wp_get_attachment_image_src( $meta, $size );
		}

		return $image;
	}
}

if ( ! function_exists( 'ps_get_select' ) ) {
	function ps_get_select( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, false );
		$meta = is_array( $meta )
			? POSTSETTINGS\sanitize_array_id( $meta )
			: POSTSETTINGS\sanitize_id( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'ps_get_color' ) ) {
	function ps_get_color( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );
		$meta = POSTSETTINGS\sanitize_text( $meta );

		// TODO: get correct string, alpha option

		return $meta;
	}
}

if ( ! function_exists( 'ps_get_range' ) ) {
	function ps_get_range( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );
		$meta = (string) (float) $meta === $meta
			? POSTSETTINGS\sanitize_float( $meta )
			: POSTSETTINGS\sanitize_integer( $meta );

		return $meta;
	}
}

if ( ! function_exists( 'ps_get_text' ) ) {
	function ps_get_text( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );
		$meta = (string) $meta;

		return $meta;
	}
}

if ( ! function_exists( 'ps_get_textarea' ) ) {
	function ps_get_textarea( $key = '', $post_id = '' ) {

		$meta = ps_get_meta( $key, $post_id, true );
		$meta = (string) $meta;

		return $meta;
	}
}
