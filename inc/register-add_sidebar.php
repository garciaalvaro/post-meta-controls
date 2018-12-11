<?php

namespace POSTSETTINGS;

function add_sidebar( $sidebar_raw = array() ) {

	if ( ! is_array( $sidebar_raw ) ) {
		return;
	}

	$class_instances =
		generate_instances(
			array( 'current' => 'sidebars', 'children' => 'tabs' ),
			array( $sidebar_raw )
		);

	if (
		empty( $class_instances['sidebars'] ) ||
		empty( $class_instances['tabs'] ) ||
		empty( $class_instances['panels'] ) ||
		empty( $class_instances['settings'] )
	) {
		return;
	}

	register_setting_meta( $class_instances['settings'] );

	\add_filter(
		'ps_add_sidebars',
		function( $ps ) use ( $class_instances ) {

			add_metadata_exists_prop( $class_instances['settings'] );

			$ps_this = array(
				'sidebars' => get_props( $class_instances['sidebars'] ),
				'tabs'     => get_props( $class_instances['tabs'] ),
				'panels'   => get_props( $class_instances['panels'] ),
				'settings' => get_props( $class_instances['settings'] ),
			);

			if (
				! empty( $ps_this['sidebars'][0]['post_type'] ) &&
				\get_post_type() === $ps_this['sidebars'][0]['post_type']
			) {
				$ps = array(
					'sidebars' => \wp_parse_args( $ps['sidebars'], $ps_this['sidebars'] ),
					'tabs'     => \wp_parse_args( $ps['tabs'], $ps_this['tabs'] ),
					'panels'   => \wp_parse_args( $ps['panels'], $ps_this['panels'] ),
					'settings' => \wp_parse_args( $ps['settings'], $ps_this['settings'] ),
				);
			}

			return $ps;
		}
	);
}
