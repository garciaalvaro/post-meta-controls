<?php

namespace POSTMETACONTROLS;

function test_meta_get_sidebar() {
	return array(
		'id'              => 'meta',
		// 'id_prefix'       => '',
		'label'           => __( 'Sidebar label', 'my_plugin' ),
		'post_type'       => array( 'post' ),
		// 'data_key_prefix' => 'pmc_',
		'icon_svg'        =>
			'<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				class="my_plugin-svg"
			>
				<polygon points="10,2 22,2 22,14 10,14" />
				<polygon points="4,8 16,8 16,20 4,20" />
			</svg>',
		// 'icon_dashicon'   => 'carrot',
		'tabs'            => array(
			test_meta_get_tab_1(),
			test_meta_get_tab_2(),
		),
	);
}
