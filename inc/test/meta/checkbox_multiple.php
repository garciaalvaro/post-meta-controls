<?php

namespace POSTMETACONTROLS;

function test_meta_get_checkbox_multiple() {
	return array(
		'type'            => 'checkbox_multiple', // Required.
		// 'id'              => 'checkbox_multiple_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'checkbox_multiple_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => array( 'aaa', 'ccc' ), // Value/s from the 'options'.
		'use_toggle'      => false, // Use toggle control instead of checkbox.
		'options'         => array( // Required.
			'aaa' => __( 'aaa Option', 'my_plugin' ),
			'bbb' => __( 'bbb Option', 'my_plugin' ),
			'ccc' => __( 'ccc Option', 'my_plugin' ),
		),
	);
}
