<?php

namespace POSTMETACONTROLS;

function test_meta_get_image() {
	return array(
		'type'            => 'image', // Required.
		// 'id'              => 'image_id',
		'data_type'       => 'none', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'image_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		// 'default_value'   => 123, // An integer which matches a media library image id.
	);
}
