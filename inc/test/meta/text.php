<?php

namespace POSTMETACONTROLS;

function test_meta_get_text() {
	return array(
		'type'            => 'text', // Required.
		// 'id'              => 'text_id',
		'data_type'       => 'meta', // Available: 'meta', 'none'.
		'data_key'        => 'text_key', // Required if 'data_type' is 'meta'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => '',
		'placeholder'     => __( 'Enter text', 'my_plugin' ),
	);
}
