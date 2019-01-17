<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Check if meta key exists.
 *
 * @since 1.0.0
 */
function meta_key_exists( $post_id = 0, $meta_key = '' ) {
	return in_array( $meta_key, get_post_custom_keys( $post_id ) );
}
