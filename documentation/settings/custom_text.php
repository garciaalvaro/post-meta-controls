<?php


$custom_text = array(
	// Setting properties:
	'type'            => 'custom_text', // Required.
	'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
	'data_key'        => 'custom_text_key', // Required if 'data_type' is 'meta' or 'localstorage'.
	// Use 'data_key_prefix' to set a custom prefix for this setting 'data_key'.
	// If 'data_key_prefix' is not assigned, the 'data_key_prefix' from the sidebar
	// where this setting is nested will be used.
	'data_key_prefix' => 'pmc_',
	'label'           => __( 'Setting label', 'my_plugin' ),
	'help'            => __( 'Setting description', 'my_plugin' ),
	'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
	'ui_border_top'   => true, // Display CSS border-top in the editor control.
	// custom_text setting properties:
	'content'         => array(
		array(
			'type'    => 'title', // Required.
			'content' => 'This is a title tag', // Required.
		),
		array(
			'type'    => 'link', // Required.
			'content' => 'This is a link', // Required.
			'href'    => 'https://example.com', // Required.
		),
		array(
			'type'    => 'paragraph', // Required.
			'content' => 'Some text inside a paragraph.', // Required.
		),
		array(
			'type'    => 'ordered_list', // Required.
			'content' => array( // Required.
				'First element',
				'Second element',
				'Third element',
			),
		),
		array(
			'type'    => 'unordered_list', // Required.
			'content' => array( // Required.
				'First element',
				'Second element',
				'Third element',
			),
		),
	),
);
