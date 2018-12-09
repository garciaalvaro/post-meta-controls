<?php

namespace POSTSETTINGS;

function add_sidebar( $sidebar_props_raw = array() ) {

	if (
		! is_array( $sidebar_props_raw ) ||
		empty( $sidebar_props_raw['id'] )// Cant be 0
	) {
		return;
	}

	$sidebar_props = generate_instances(
		'sidebar',
		array( $sidebar_props_raw ),
		array()
	);
	// $sidebar_props = $sidebar_props[0];

	// var_dump( $sidebar_props[0]['tabs'][0]['panels'][0]['settings'][0] );
	/*highlight_string("<?php\n\$data =\n" . var_export($sidebar_props, true) . ";\n?>");*/

	\add_filter( 'ps_add_sidebar', function( $sidebars ) use ( $sidebar_props ) {
		// $sidebars[] = $sidebar_props;
		$sidebars = array_merge( $sidebars, $sidebar_props );

		return $sidebars;
	} );
}
