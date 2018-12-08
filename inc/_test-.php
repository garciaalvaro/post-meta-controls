<?php

$sidebar_a = array(
	'id'    => 'aaa',
	'label' => 'a',
	'tabs'  => array(
		array(
			'label'  => '111',
			'panels' => array(
				array(
					'label'          => 'a',
					'with_container' => true,
					'initial_open'   => true,
					'settings'       => array(
						array(
							'meta_key'        => 'aaa',
							'meta_key_prefix' => 'ppref_',

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
						array(
							'help'     => 'help asd',
							'type'     => 'checkbox',
							'default'  => true,
							'meta_key' => 'bbb',
							'label'    => 'bbb',
						),
					),
				),
				array(
					'label'          => 'a',
					'with_container' => false,
					'settings'       => array(
						array(
							'help'      => 'help asd',
							'type'      => 'radio',
							'default'   => 'ww',

							'meta_key'  => 'ccc',

							'label'     => 'ccc',
							'options'   => array(
								'uu' => 'UU',
								'vv' => 'VV',
								'ww' => 'ww',
							),
						),
						array(
							'help'     => 'help asd',
							'type'     => 'checkbox',
							'default'  => true,
							'meta_key' => 'ddd',
							'label'    => 'ddd',
						),
					),
				),
			),
		),
		array(
			'label'  => '222',
			'panels' => array(
				array(
					'label'          => 'a',
					'with_container' => true,
					'initial_open'   => true,
					'settings'       => array(
						array(
							'help'     => 'help asd',
							'type'     => 'radio',
							'default'  => 'ww',
							'meta_key' => 'eee',
							'label'    => 'eee',
							'options'  => array(
								'uu' => 'UU',
								'vv' => 'VV',
								'ww' => 'ww',
							),
						),
						array(
							'help'     => 'help asd',
							'type'     => 'checkbox',
							'default'  => true,
							'meta_key' => 'fff',
							'label'    => 'fff',
						),
					),
					'label'          => 'a',
					'with_container' => false,
					'settings'       => array(
						array(
							'help'     => 'help asd',
							'type'     => 'radio',
							'default'  => 'ww',
							'meta_key' => 'ggg',
							'label'    => 'ggg',
							'options'  => array(
								'uu' => 'UU',
								'vv' => 'VV',
								'ww' => 'ww',
							),
						),
						array(
							'help'     => 'help asd',
							'type'     => 'checkbox',
							'default'  => true,
							'meta_key' => 'hhh',
							'label'    => 'hhh',
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
