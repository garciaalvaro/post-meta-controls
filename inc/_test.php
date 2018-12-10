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
							'data_key'        => 'ttt',
							// 'data_key_prefix' => 'ps_',

							'min'            => 100,
							'max'            => 200,

							'help'            => 'help asd',
							// 'multiple'        => true,
							'default_value'   => 'ww',
							'label'           => 'vvvvvvvvvv',
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
