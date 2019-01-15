<?php


$tab = array(
	'label'         => __( 'Tab label', 'my_plugin' ), // Required.
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
	'panels'        => array( // Required. Array of panels to include in this tab.
		$my_panel,
		$my_other_panel,
	),
);
