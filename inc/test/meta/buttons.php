<?php

namespace POSTMETACONTROLS;

function test_meta_get_buttons() {
	return array(
		'type'            => 'buttons', // Required.
		// 'id'              => 'buttons_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'buttons_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => 'aaa', // The value of one of the 'options'.
		'allow_empty'     => true,
		'options'         => array( // Required.
			array(
				'title'    => __( 'Option title aaa', 'my_plugin' ), // Required.
				'value'    => 'aaa', // Required.
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
				'icon_dashicon' => 'carrot',
			),
		),
	);
}