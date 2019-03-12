<?php

namespace POSTMETACONTROLS;

function test_meta_get_checkbox() {
	return array(
		'type'            => 'checkbox', // Required.
		// 'id'              => 'checkbox_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'checkbox_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => false,
		'use_toggle'      => false, // Use toggle control instead of checkbox.
		'input_label'     => __( 'Input label', 'my_plugin' ), // Required.
	);
}
