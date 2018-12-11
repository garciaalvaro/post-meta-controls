<?php

$sidebar_a = array(
	'id'              => 'aaa',
	'label'           => 'a',
	'meta_key_prefix' => 'sideb_',
	'tabs'            => array(
		array(
			'label'  => '111',
			'panels' => array(
				array(
					'label'          => 'a',
					'with_container' => true,
					'initial_open'   => true,
					'settings'       => array(
						array(
							'type'            => 'range',

							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'zz',
							// 'data_key_prefix' => 'ps_',

							'float_number'   => true,
							'step'           => 1.11,
							'min'            => 100,
							'max'            => 200,

							'help'            => 'help asd',
							// 'multiple'        => true,
							'default_value'   => 'ww',
							'label'           => 'Setting numero #1',
							'qoptions'         => array(
								'uu' => 'UU',
								'vv' => 'VV',
								'ww' => 'ww',
							),
						),
						array(
							'type'            => 'radio',

							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'qwq',
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

// ps_add_sidebar( $sidebar_a );

// $sidebar_a['id'] = 'bbb';

// ps_add_sidebar( $sidebar_a );

POSTSETTINGS\add_sidebar( $sidebar_a );
