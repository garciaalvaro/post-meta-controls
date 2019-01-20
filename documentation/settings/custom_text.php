<?php


$custom_text = array(
	'type'          => 'custom_text', // Required.
	// Optionally, an id may be specified. It will be used by the plugin to
	// identify the setting and will be applied to the control html.
	// The prefix set in the sidebar option 'id_prefix' will be applied.
	'id'            => 'custom_text_id',
	'label'         => __( 'Setting label', 'my_plugin' ),
	'help'          => __( 'Setting description', 'my_plugin' ),
	'ui_border_top' => true, // Display CSS border-top in the editor control.
	// Setting custom_text specific options:
	'content'       => array(
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
