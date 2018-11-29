<?php


if ( ! function_exists( 'ps_add_sidebar' ) ) {
	function ps_add_sidebar( $sidebar_raw_props = array() ) {

		if (
			! is_array( $sidebar_raw_props ) ||
			empty( $sidebar_raw_props['tabs'] ) ||
			! class_exists( 'POSTSETTINGS\Sidebar' ) ||
			! class_exists( 'POSTSETTINGS\Tab' ) ||
			! class_exists( 'POSTSETTINGS\Panel' ) ||
			! class_exists( 'POSTSETTINGS\Setting' ) ||
			! function_exists( 'POSTSETTINGS\create_class_instance' )
		) {
			return false;
		}

		$sidebar       = new POSTSETTINGS\Sidebar( $sidebar_raw_props );
		$sidebar_props = $sidebar->get_props();

		if ( empty( $sidebar_props['valid'] ) ) {
			return false;
		}

		POSTSETTINGS\create_class_instance(
			'tab',
			$sidebar_props['id'],
			$sidebar_props['post_type'],
			$sidebar_raw_props['tabs']
		);
	}
}
