<?php

$sidebar_a = array(
	'id'          => 'my-sidebar',
	'label'           => 'a',
	'meta_key_prefix' => 'sideb_',
	'tabs'            => array(
		array(
			'id'     => 'my-tab',
			'label'  => '111',
			'panels' => array(
				array(
					'id'          => 'my-panel',
					'label'          => 'a',
					'with_container' => true,
					'initial_open'   => true,
					'settings'       => array(
						array(
							'type'            => 'color',

							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'zaaxc',
							// 'data_key_prefix' => 'ps_',

							'alpha'   => true,
							'float_number'   => true,
							'step'           => 1.11,
							'min'            => 100,
							'max'            => 200,

							'help'            => 'help asd',
							// 'multiple'        => true,
							'default_value'   => 'deeef txt',
							'label'           => 'Setting numero #1',
							'palette'         => array(
								'rojo'     => '#f00',
								'amarillo' => '#fc0',
							),
						),
						array(
							'id'            => 'my-setting',
							'type'            => 'radio',

							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'cxz',
							// 'data_key_prefix' => 'ps_',

							'step'           => 0,
							'min'            => 1100,
							'max'            => 200,

							'help'            => 'help asd',
							// 'multiple'        => true,
							'default_value'   => 'ww',
							'label'           => 'Setting numero #1',
							'options'         => array(
								'uu' => 'UU',
								'vv' => 'VV',
								'ww' => 'ww',
							),
						),
					),
				),
			),
		),
	),
);


// POSTSETTINGS\add_sidebar( $sidebar_a );
// $sidebar_a['id'] = 'bbb';
POSTSETTINGS\add_sidebar( $sidebar_a );
