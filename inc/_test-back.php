<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function qregister_sidebar( $sidebars ) {

	$tab = array(
		'label'  => 'Tab One',
		'icon_dashicon' => 'sos',
		'panels' => array(
			array(
				'collapsible' => false,
				'initial_open' => true,
				'label' => 'asd',
				'icon_dashicon' => 'sos',
				'settings'      => array(
					array(
						'type'          => 'repeatable',
						'data_type'     => 'meta',
						'data_key'      => 'qqq',
						'default_value' => 50,
						'label'         => __( 'Range Label', 'my_plugin' ),
						// 'no_border_top' => true,
						// Properties of this Setting type:
						'min'           => 0,
						'max'           => 100,
						'step'          => 5,
					),
					array(
						'type'          => 'text',
						'data_type'     => 'meta',
						'data_key'      => 'qqq',
						'default_value' => 'Some text',
						'label'         => __( 'Text Label', 'my_plugin' ),
						// Properties of this Setting type:
						'placeholder'   => __( 'Some placeholder text', 'my_plugin' ),
					),
					array(
						'type'          => 'text',
						'data_type'     => 'meta',
						'data_key'      => 'qqq',
						'default_value' => 'Some text',
						'label'         => __( 'Text Label', 'my_plugin' ),
						// Properties of this Setting type:
						'placeholder'   => __( 'Some placeholder text', 'my_plugin' ),
					),
				),
			),
		),
	);

	$sidebar = array(
		// 'id'              => 'fffonts',
		'label'           => 'fffonts',
		// 'data_key_prefix' => '',
		// 'post_type'       => 'fffont',
		'tabs'            => array( $tab ),
	);

	$sidebars[] = $sidebar;

	return $sidebars;

}

// add_filter( 'pmc_create_sidebar', __NAMESPACE__ . '\qregister_sidebar' );












function my_function( $sidebars ) {

	update_post_meta( 2918, 'checkbox_multiple_id', 'bbb' );

}

// add_filter( 'admin_init', __NAMESPACE__ . '\my_function' );

function qregister_meta(){

	register_post_meta( 'post', 'qqq', array(
		'show_in_rest'      => true,
		'single'            => false,
		'type'              => 'string',
		'sanitize_callback' => function( $value ) {

			// wp_die( 'Invalid value, go back and try again.' );
			// return $value.'q';

		},
	) );

}

// add_filter( 'init', __NAMESPACE__ . '\qregister_meta' );
