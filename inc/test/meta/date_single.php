<?php

namespace POSTMETACONTROLS;

function test_meta_get_date_single() {
	return array(
		'type'            => 'date_single', // Required.
		// 'id'              => 'date_single_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'date_single_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => '', // A string with a date that matches 'format'.
		'format'          => 'DD/MM/YYYY',
		'locale'          => 'en',
	);
}
