<?php

namespace POSTMETACONTROLS;

function test_meta_get_image_multiple() {
	return array(
		'type'            => 'image_multiple', // Required.
		// 'id'              => 'image_multiple_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'image_multiple_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		// 'default_value'   => array( 123, 456 ), // Array of integer which match media library images id.
	);
}
