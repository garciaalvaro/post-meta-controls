<?php

namespace POSTMETACONTROLS;

function test_meta_get_range_float() {
	return array(
		'type'            => 'range_float', // Required.
		// 'id'              => 'range_float_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'range_float_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => 5,
		'step'            => 0.5,
		'min'             => 0, // Required.
		'max'             => 10, // Required.
	);
}
