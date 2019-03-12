<?php

namespace POSTMETACONTROLS;

function test_meta_get_custom_text() {
	return array(
		'type'          => 'custom_text', // Required.
		// 'id'            => 'custom_text_id',
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
}
