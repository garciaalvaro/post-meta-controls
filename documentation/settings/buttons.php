<?php


$buttons = array(
	// Setting properties:
	'type'            => 'buttons', // Required.
	// Optionally, an id may be specified. It will be used by the plugin to
	// identify the setting and will be applied to the control html.
	'id'              => 'buttons_id',
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'buttons_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// buttons setting properties:
	'default_value'   => 'aaa', // The value of one of the 'options'.
	'allow_empty'     => true,
	'options'         => array( // Required.
		array(
			'title'    => __( 'Option title aaa', 'my_plugin' ), // Required.
			'value'    => 'aaa', // Required.
			// Either 'icon_svg' or 'icon_dashicon' can be set.
			// 'icon_svg' takes preference over 'icon_dashicon'.
			// See the next option for an example of 'icon_dashicon'.
			'icon_svg' => // svg string.
				'<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					class="my_plugin-svg"
				>
					<polygon points="10,2 22,2 22,14 10,14" />
					<polygon points="4,8 16,8 16,20 4,20" />
				</svg>',
		),
		array(
			'title'         => __( 'Option title bbb', 'my_plugin' ), // Required.
			'value'         => 'bbb', // Required.
			// Name of a dashicon. To see the list of available icons
			// check: https://developer.wordpress.org/resource/dashicons
			'icon_dashicon' => 'carrot',
		),
	),
);
