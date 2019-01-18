<?php

function myplugin_create_sidebar( $sidebars ) {

	// First we define the sidebar with it's tabs, panels and settings.
	$sidebar = array(
		'id'              => 'mysidebar',
		'id_prefix'       => 'myidprefix_',
		'label'           => __( 'Sidebar label', 'my_plugin' ),
		'post_type'       => array( 'post', 'my_custom_post_type' ),
		'data_key_prefix' => 'mydataprefix_',
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
										'icon_dashicon' => 'sos',
									),
								),
							),
							// Checkbox setting.
							array(
								'type'          => 'checkbox',
								'data_type'     => 'meta',
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

	// Push the $sidebar we just assigned to the variable
	// to the array of $sidebars that comes in the function argument.
	$sidebars[] = $sidebar;

	// Return the $sidebars array with our sidebar now included.
	return $sidebars;

}

add_filter( 'pmc_create_sidebar', 'myplugin_create_sidebar' );
