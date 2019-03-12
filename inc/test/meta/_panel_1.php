<?php

namespace POSTMETACONTROLS;

function test_meta_get_panel_1() {
	return array(
		'label'         => __( 'Panel label', 'my_plugin' ),
		// 'id'            => 'panel_id',
		'collapsible'   => true,
		'initial_open'  => true,
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
		'settings'      => array(
			test_meta_get_repeatable(),

			test_meta_get_buttons(),
			test_meta_get_checkbox_multiple(),
			test_meta_get_checkbox(),
			test_meta_get_color(),
			test_meta_get_custom_text(),
			test_meta_get_date_range(),
			test_meta_get_date_single(),
			test_meta_get_image_multiple(),
		),
	);
}
