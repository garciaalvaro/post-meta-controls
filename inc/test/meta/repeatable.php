<?php

namespace POSTMETACONTROLS;

function test_meta_get_repeatable() {
	return array(
		'type'            => 'repeatable', // Required.
		// 'id'              => 'repeatable_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'qqrepeatable_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'button_add_text' => __( 'Add Color' ),
		'new_instance_default_value' => 30,

		// color
		'type_to_repeat'  => 'color',
		'default_value'   => array( '#fc0', '#f9e' ),
		'alpha_control'   => true, // Include alpha control to set color transparency.
		'palette'         => array(
			'red'   => '#ff0000',
			'green' => '#00ff00',
		),
		// range
		'type_to_repeat'  => 'range',
		'default_value'   => array( 50, 20, 80),
		'step'            => 2,
		'min'             => 10, // Required.
		'max'             => 100, // Required.
	);
}
