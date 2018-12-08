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

							'data_type'       => 'localstorage', // localstorage meta none option
							'meta_key'        => 'qwee',
							// 'meta_key_prefix' => 'ps_',

							'help'     => 'help asd',
							'type'     => 'radio',
							'default'  => 'ww',
							'label'    => 'vvvvvvvvvv',
							'options'  => array(
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
