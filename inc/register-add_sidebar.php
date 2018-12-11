<?php

namespace POSTSETTINGS;

function add_sidebar( $sidebar_props_raw = array() ) {

	if (
		! is_array( $sidebar_props_raw ) ||
		empty( $sidebar_props_raw['id'] )// Cant be 0
	) {
		return;
	}

	\add_filter(
		'ps_add_sidebar',
		function( $sidebars ) use ( $sidebar_props_raw ) {

			$sidebar_this = generate_instances(
				'sidebar',
				array( $sidebar_props_raw ),
				array()
			);

			if (
				! empty( $sidebar_this[0]['post_type'] ) &&
				\get_post_type() === $sidebar_this[0]['post_type']
			) {
				return array_merge( $sidebars, $sidebar_this );
			}

			return $sidebars;
		}
	);
}
