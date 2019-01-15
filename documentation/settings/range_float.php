<?php


$range_float = array(
	// Setting properties:
	'type'            => 'range_float', // Required.
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'range_float_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// range_float setting properties:
	'default_value'   => 5,
	'step'            => 0.5,
	'min'             => 0, // Required.
	'max'             => 10, // Required.
);
