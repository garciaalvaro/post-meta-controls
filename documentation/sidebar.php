<?php


$sidebar = array(
	'id'              => 'sidebar_id', // Required.
	'label'           => __( 'Sidebar label', 'my_plugin' ), // Required.
	// Post types where this sidebar will be assigned and where each
	// setting meta will be registered (if the setting 'data_type' is 'meta').
	'post_type'       => array( 'post' ),
	// Use 'data_key_prefix' to set a custom prefix for this sidebars settings 'data_key'.
	// If 'data_key_prefix' is not assigned, the default 'pmc_' will be used.
	'data_key_prefix' => 'pmc_',
	// Either 'icon_svg' or 'icon_dashicon' can be set.
	// 'icon_svg' takes preference over 'icon_dashicon'.
	'icon_svg'        => // svg string.
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
	'icon_dashicon'   => 'carrot',
	'tabs'            => array( // Required. Array of tabs to include in this sidebar.
		$my_tab,
		$my_other_tab,
	),
);
