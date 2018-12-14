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
							'type'            => 'image',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'image3',

							'multiple'        => true,
							'default_value'   => array(168,159),
							'label'           => 'image',
						),
						array(
							'type'            => 'select',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'select',

							'default_value'   => 'bbb',
							'label'           => 'select',
							'options'         => array(
								'aaa' => 'aaa',
								'bbb' => 'bbb',
							),
						),
						array(
							'type'            => 'select',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'select_multiple',

							'multiple'        => true,
							'default_value'   => ['bbb'],
							'label'           => 'select_multiple',
							'options'         => array(
								'aaa' => 'aaa',
								'bbb' => 'bbb',
							),
						),
						array(
							'type'            => 'radio',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'radio',

							'default_value'   => 'bbb',
							'label'           => 'radio',
							'options'         => array(
								'aaa' => 'aaa',
								'bbb' => 'bbb',
							),
						),
						array(
							'type'            => 'checkbox',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'checkbox',

							'default_value'  => true,
							'label'          => 'checkbox',
							'help'           => 'checkbox',
						),
						array(
							'type'            => 'text',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'text',

							'default_value'   => 'text',
							'label'           => 'text',
						),
						array(
							'type'            => 'textarea',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'textarea',

							'default_value'   => 'textarea',
							'label'           => 'textarea',
						),
						array(
							'type'            => 'range',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'range',

							'step'           => 2,
							'min'            => 100,
							'max'            => 200,
							'default_value'   => 144,
							'label'           => 'range',
						),
						array(
							'type'            => 'range',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'range_float',

							'float_number'   => true,
							'step'           => 0.1,
							'min'            => 100.2,
							'max'            => 200.2,
							'default_value'   => 140.2,
							'label'           => 'range_float',
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
