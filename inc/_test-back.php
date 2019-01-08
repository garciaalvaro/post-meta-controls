<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function my_function( $sidebars ) {

	$tab = array(
		'label'  => 'Tab One',
		'panels' => array(
			array(
				'with_container' => false,
				'settings'       => array(
					array(
						'type'      => 'multi_checkbox',
						'data_type' => 'meta',
						'data_key'  => 'multi_checkbox',
						'label'     => 'multi_checkbox',
						'use_toggle' => true,
						'options'   => array(
							'aaa' => 'aaa',
							'bbb' => 'bbb',
							'ccc' => 'ccc',
							'ddd' => 'ddd',
						),
						// 'options'   => array(
						// 	'100' => '100',
						// 	'200' => '200',
						// 	'300' => '300',
						// 	'500' => '500',
						// ),
					),
					array(
						'type'       => 'checkbox',
						'data_type'  => 'meta',
						'data_key'   => 'checkbox',
						'label'      => 'checkbox',
						'conditions' => array(
							array(
								'disable_if_value_is'    => 'equal_to', // not_equal_to, lesser_than, greater_than
								'value'                  => '', // string,integer,float,array_former
								'settings_id_to_disable' => '', // string,array_string
							),
						),
					),
					// array(
					// 	'id'      => 'perert',
					// 	'type'      => 'select',
					// 	'data_type' => 'meta',
					// 	'data_key'  => 'variant',
					// 	'label'     => 'variant',
					// 	'multiple'  => true,
					// 	'options'   => array(
					// 		'100' => '100',
					// 		'200' => '200',
					// 		'300' => '300',
					// 		'500' => '500',
					// 		'600' => '600',
					// 		'700' => '700',
					// 		'800' => '800',
					// 		'900' => '900',
					// 	),
					// ),
				),
			),
		),
	);

	$sidebar = array(
		'id'              => 'test',
		'label'           => 'test',
		'data_key_prefix' => '',
		'post_type'       => '',
		'tabs'            => array( $tab ),
		'icon_svg'        =>
			'<svg width="18" height="18" viewBox="0 0 24 24">
				<polygon
					points="10,2 22,2 22,14 10,14"
					className={`${plugin_slug}-icon-back-y`}
				/>
				<polygon
					points="10,14 22,14 16,20 4,20"
					className={`${plugin_slug}-icon-back-z`}
				/>
				<polygon
					points="10,2 10,14 4,20 4,8"
					className={`${plugin_slug}-icon-back-x`}
				/>
				<polygon
					points="4,8 16,8 16,20 4,20"
					className={`${plugin_slug}-icon-front-y`}
				/>
				<polygon
					points="10,2 22,2 16,8 4,8"
					className={`${plugin_slug}-icon-front-z`}
				/>
				<polygon
					points="22,2 22,14 16,20 16,8"
					className={`${plugin_slug}-icon-front-x`}
				/>
				<script>alert("svg alert")</script>
			</svg>',
	);

	$sidebars[] = $sidebar;

	return $sidebars;

}

// add_filter( 'pmc_create_sidebar', __NAMESPACE__ . '\my_function' );
