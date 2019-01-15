<?php


$date_range = array(
	// Setting properties:
	'type'            => 'date_range', // Required.
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'date_range_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// date_range setting properties:
	'default_value'   => '', // A string with a date that matches 'format'.
	// To see the available formats
	// check: http://momentjs.com/docs/#/parsing/string-format/
	'format'          => 'DD/MM/YYYY',
	// A string with the locale value.
	// For example 'en' for english, or 'ja' for japanese.
	// To see the available locales check https://momentjs.com/
	'locale'          => 'en',
);
