<?php

function myplugin_create_sidebar( $sidebars ) {

	// First we define the sidebar with it's tabs, panels and settings.
	$sidebar = array(
		'label'           => __( 'Sidebar label', 'my_plugin' ),
		'post_type'       => array( 'post' ),
		'data_key_prefix' => 'myprefix_',
		'icon_dashicon'   => 'carrot',
		'tabs'            => array(
			array(
				'label'  => __( 'Tab label', 'my_plugin' ),
				'panels' => array(
					array(
						'label'    => __( 'Panel label', 'my_plugin' ),
						'settings' => array(
							// Buttons setting.
							array(
								'type'          => 'buttons',
								'data_type'     => 'meta',
								'data_key'      => 'buttons_key',
								'label'         => __( 'Setting label', 'my_plugin' ),
								'help'          => __( 'Setting description', 'my_plugin' ),
								'default_value' => 'bbb',
								'options'       => array(
									array(
										'title'         => __( 'Option title aaa', 'my_plugin' ),
										'value'         => 'aaa',
										'icon_dashicon' => 'carrot',
									),
									array(
										'title'         => __( 'Option title bbb', 'my_plugin' ),
										'value'         => 'bbb',
										'icon_dashicon' => 'carrot',
									),
								),
							),
							// Checkbox setting.
							array(
								'type'          => 'checkbox',
								'data_type'     => 'none',
								'data_key'      => 'checkbox_key',
								'label'         => __( 'Setting label', 'my_plugin' ),
								'help'          => __( 'Setting description', 'my_plugin' ),
								'default_value' => false,
								'use_toggle'    => true,
								'input_label'   => __( 'Input label', 'my_plugin' ),
							),
						),
					),
				),
			),
		),
	);

	// We push the $sidebar to the array of $sidebars from the function argument.
	$sidebars[] = $sidebar;

	// We return the $sidebars array with our sidebar now included.
	return $sidebars;

}

add_filter( 'pmc_create_sidebar', 'myplugin_create_sidebar' );
