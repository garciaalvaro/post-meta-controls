<?php

$sidebar_a = array(
	'key'       => 'a',
	'label'       => 'a',
	// 'post_type' => 'ebisuportfolio',
);
$tab_a = array(
	'sidebar_key' => 'a',
	'key'         => 'a',
	'label'       => 'a',
);
$tab_b = array(
	'sidebar_key' => 'a',
	'key'         => 'b',
	'label'       => 'b',
);
$panel_a = array(
	'tab_key' => 'a',
	'key'     => 'a',
	'label'   => 'a',
	'initial_open'   => true,
);
$panel_b = array(
	'tab_key' => 'b',
	'key'     => 'b',
	'label'   => 'b',
	'with_container'   => false,
);
$checkbox_a = array(
	'panel_key' => 'a',
	'default'   => false,
	'key'       => 'checkbox_a',
	'label'     => 'label asd',
	'help'     => 'help asd',
);
$radio_b = array(
	'help'     => 'help asd',
	'panel_key' => 'a',
	'default'   => 'ww',
	'key'       => 'radio_b',
	'label'     => 'radio_b',
	'options'   => array(
		'uu' => 'UU',
		'vv' => 'VV',
		'ww' => 'ww',
	),
);
$checkbox_c = array(
	'panel_key' => 'b',
	'default'   => false,
	'key'       => 'checkbox_c',
	'label'     => 'checkbox_c',
	'help'     => 'checkbox_c',
);
$radio_d = array(
	'help'     => 'radio_d',
	'panel_key' => 'b',
	'default'   => 'ww',
	'key'       => 'radio_d',
	'label'     => 'radio_d',
	'options'   => array(
		'uu' => 'UU',
		'vv' => 'VV',
		'ww' => 'ww',
	),
);

ps_add_sidebar( $sidebar_a );

ps_add_tab( $tab_a );
ps_add_tab( $tab_b );

ps_add_panel( $panel_a );
ps_add_panel( $panel_b );

ps_add_setting_checkbox( $checkbox_a );
ps_add_setting_radio( $radio_b );

ps_add_setting_checkbox( $checkbox_c );
ps_add_setting_radio( $radio_d );
