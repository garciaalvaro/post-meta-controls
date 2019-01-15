<?php


$text = array(
	// Setting properties:
	'type'            => 'text', // Required.
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'text_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// text setting properties:
	'default_value'   => '',
	'placeholder'     => __( 'Enter text', 'my_plugin' ),
);
