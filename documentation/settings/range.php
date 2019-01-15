<?php


$range = array(
	// Setting properties:
	'type'            => 'range', // Required.
	// Optionally, an id may be specified. It will be used by the plugin to
	// identify the setting and will be applied to the control html.
	'id'              => 'range_id',
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'range_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// range setting properties:
	'default_value'   => 50,
	'step'            => 1,
	'min'             => 0, // Required.
	'max'             => 100, // Required.
);
