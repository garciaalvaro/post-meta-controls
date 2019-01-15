<?php


$color = array(
	// Setting properties:
	'type'            => 'color', // Required.
	// Optionally, an id may be specified. It will be used by the plugin to
	// identify the setting and will be applied to the control html.
	'id'              => 'color_id',
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'color_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// color setting properties:
	'default_value'   => '', // A string with a HEX, rgb or rgba color format.
	'alpha_control'   => false, // Include alpha control to set color transparency.
	'palette'         => array(
		'red'   => '#ff0000',
		'green' => '#00ff00',
	),
);
