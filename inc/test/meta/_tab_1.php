<?php

namespace POSTMETACONTROLS;

function test_meta_get_tab_1() {
	return array(
		'label'         => __( 'Tab label', 'my_plugin' ),
		// 'id'            => 'tab_id',
		'icon_svg'      =>
			'<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				class="my_plugin-svg"
			>
				<polygon points="10,2 22,2 22,14 10,14" />
				<polygon points="4,8 16,8 16,20 4,20" />
			</svg>',
		// 'icon_dashicon' => 'carrot',
		'panels'        => array(
			test_meta_get_panel_1(),
		),
	);
}
