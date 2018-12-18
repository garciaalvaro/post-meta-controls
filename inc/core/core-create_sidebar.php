<?php

namespace POSTSETTINGS;

function create_sidebar( $raw_props = array() ) {

	if ( ! is_array( $raw_props ) || empty( $raw_props ) ) {
		return;
	}

	$class_instances =
		create_instances(
			array( 'current' => 'sidebars', 'children' => 'tabs' ),
			array( $raw_props )
		);

	if (
		empty( $class_instances['sidebars'] ) ||
		empty( $class_instances['tabs'] ) ||
		empty( $class_instances['panels'] ) ||
		empty( $class_instances['settings'] )
	) {
		return;
	}

	call_register_meta( $class_instances['settings'] );

	\add_filter(
		'ps_create_sidebar',
		function( $props ) use ( $class_instances ) {

			call_set_metadata_exists( $class_instances['settings'] );

			$props_this = array(
				'sidebars' => call_get_props( $class_instances['sidebars'] ),
				'tabs'     => call_get_props( $class_instances['tabs'] ),
				'panels'   => call_get_props( $class_instances['panels'] ),
				'settings' => call_get_props( $class_instances['settings'] ),
			);

			$post_type       = \get_post_type();
			$props_post_type = $props_this['sidebars'][0]['post_type'];

			if (
				empty( $props_post_type ) ||
				( is_array( $props_post_type ) && in_array( $post_type, $props_post_type ) ) ||
				$post_type === $props_post_type
			) {
				$props = array(
					'sidebars' => \wp_parse_args( $props['sidebars'], $props_this['sidebars'] ),
					'tabs'     => \wp_parse_args( $props['tabs'], $props_this['tabs'] ),
					'panels'   => \wp_parse_args( $props['panels'], $props_this['panels'] ),
					'settings' => \wp_parse_args( $props['settings'], $props_this['settings'] ),
				);
			}

			return $props;
		}
	);
}
