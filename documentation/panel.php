<?php


$panel = array(
	'label'         => __( 'Panel label', 'my_plugin' ), // Required if 'collapsible' is true.
	'collapsible'   => true, // If true the panel will collapse and expand on click.
	'initial_open'  => false, // This option is applicable only if 'collapsible' is true.
	// Either 'icon_svg' or 'icon_dashicon' can be set. Both are optional.
	// 'icon_svg' takes preference over 'icon_dashicon'.
	'icon_svg'      => // svg string.
		'<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			class="my_plugin-svg"
		>
			<polygon points="10,2 22,2 22,14 10,14" />
			<polygon points="4,8 16,8 16,20 4,20" />
		</svg>',
	// Name of a dashicon. To see the list of available icons
	// check: https://developer.wordpress.org/resource/dashicons
	'icon_dashicon' => 'carrot',
	'settings'      => array( // Required. Array of settings to include in this panel.
		$my_checkbox,
		$my_radio,
	),
);
