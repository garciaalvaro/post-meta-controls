<?php

namespace POSTMETACONTROLS;

function test_meta_get_textarea() {
	return array(
		'type'            => 'textarea', // Required.
		// 'id'              => 'textarea_id',
		'data_type'       => 'meta', // Available: 'meta', 'none'.
		'data_key'        => 'textarea_key', // Required if 'data_type' is 'meta'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => '',
		'placeholder'     => __( 'Enter text', 'my_plugin' ),
	);
}
