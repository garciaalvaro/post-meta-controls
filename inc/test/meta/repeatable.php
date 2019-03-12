<?php

namespace POSTMETACONTROLS;

function test_meta_get_repeatable() {
	return array(
		'type'            => 'repeatable', // Required.
		// 'id'              => 'repeatable_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'repeatable_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'button_add_text' => __( 'Add Color' ),

		// color
		'type_to_repeat'  => 'color',
		'alpha_control'   => true, // Include alpha control to set color transparency.
		'palette'         => array(
			'red'   => '#ff0000',
			'green' => '#00ff00',
		),
		// // range
		// 'type_to_repeat'  => 'range',
		// 'default_value'   => 50,
		// 'step'            => 1,
		// 'min'             => 0, // Required.
		// 'max'             => 100, // Required.
	);
}
