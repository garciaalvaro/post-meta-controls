<?php

namespace POSTMETACONTROLS;

function test_meta_get_color() {
	return array(
		'type'            => 'color', // Required.
		// 'id'              => 'color_id',
		'data_type'       => 'meta', // Available: 'meta', 'localstorage', 'none'.
		'data_key'        => 'color_key', // Required if 'data_type' is 'meta' or 'localstorage'.
		// 'data_key_prefix' => 'pmc_',
		'label'           => __( 'Setting label', 'my_plugin' ),
		'help'            => __( 'Setting description', 'my_plugin' ),
		'register_meta'   => true, // This option is applicable only if 'data_type' is 'meta'.
		'ui_border_top'   => true, // Display CSS border-top in the editor control.
		'default_value'   => '', // A string with a HEX, rgb or rgba color format.
		'alpha_control'   => true, // Include alpha control to set color transparency.
		'palette'         => array(
			'red'   => '#ff0000',
			'green' => '#00ff00',
		),
	);
}
