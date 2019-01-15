<?php


$checkbox_multiple = array(
	// Setting properties:
	'type'            => 'checkbox_multiple', // Required.
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'checkbox_multiple_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// checkbox_multiple setting properties:
	'default_value'   => array( 'aaa', 'ccc' ), // Value/s from the 'options'.
	'use_toggle'      => false, // Use toggle control instead of checkbox.
	'options'         => array( // Required.
		'aaa' => __( 'aaa Option', 'my_plugin' ),
		'bbb' => __( 'bbb Option', 'my_plugin' ),
		'ccc' => __( 'ccc Option', 'my_plugin' ),
	),
);
