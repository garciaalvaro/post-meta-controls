<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function my_function( $sidebars ) {

$settings = array(
	array(
		'type'            => 'buttons',
		'data_type'       => 'meta', // localstorage meta none option
		'data_key'        => 'buttons1',
		'allow_empty'        => true,
		'default_value'        => 'aaa',
		'options' => array(
array(
	'title'=>'editor-textcolor',
	'value'=>'editor-textcolor',
	'icon_dashicon'=>'editor-textcolor',
),
array(
	'title'=>'lightbulb',
	'value'=>'lightbulb',
	'icon_dashicon'=>'lightbulb',
),
array(
	'title'=>'carrot',
	'value'=>'aaa',
	'icon_dashicon'=>'carrot',
),
array(
	// 'title'=>'custom svg',
	'value'=>'ccc',
	'icon_svg'=>'<svg width="24" height="24" viewBox="0 0 24 24">
	<script>alert("svg alert")</script>
	<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
	<path fill="none" d="M0 0h24v24H0V0z" />
</svg>',
),
		),
	),
	array(
		'type'            => 'date_time',
		'data_type'       => 'meta', // localstorage meta none option
		'data_key'        => 'date_time11qa2',
		'default_value'   => "qwe",
		'use_12hour'      => true,
	),
	// array(
	// 	'type'            => 'image',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'image9',

	// 	// 'multiple'        => true,
	// 	'default_value'   => 168,
	// 	// 'default_value'   => array(168,159),
	// 	'label'           => 'image',
	// ),
	// array(
	// 	'type'            => 'select',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'select3',

	// 	'default_value'   => 'ccc',
	// 	'label'           => 'select',
	// 	'options'         => array(
	// 		'aaa' => 'aaa',
	// 		'bbb' => 'bbb',
	// 		'ccc' => 'ccc',
	// 	),
	// ),
	array(
		'type'            => 'select',
		'data_type'       => 'meta', // localstorage meta none option
		'data_key'        => 'select_multiple1',

		'multiple'        => true,
		'default_value'   => ['bbb'],
		// 'default_value'   => ['bbb','ccc'],
		'label'           => 'select_multiple',
		'options'         => array(
			'aaa' => 'aaa',
			'bbb' => 'bbb',
			'ccc' => 'ccc',
		),
	),
	// array(
	// 	'type'            => 'radio',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'radio',

	// 	'default_value'   => 'bbb',
	// 	'label'           => 'radio',
	// 	'options'         => array(
	// 		'aaa' => 'aaa',
	// 		'bbb' => 'bbb',
	// 	),
	// ),
	// array(
	// 	'type'            => 'checkbox',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'checkbox',

	// 	'default_value'  => true,
	// 	'label'          => 'checkbox',
	// 	'help'           => 'checkbox',
	// ),
	// array(
	// 	'type'            => 'text',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'text',

	// 	'default_value'   => 'text',
	// 	'label'           => 'text',
	// ),
	// array(
	// 	'type'            => 'textarea',
	// 	'data_type'       => 'localstorage', // localstorage meta none option
	// 	'data_key'        => 'textarea1',

	// 	'default_value'   => 'textarea',
	// 	'label'           => 'textarea',
	// ),
	// array(
	// 	'type'            => 'range',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'range',

	// 	'step'           => 2,
	// 	'min'            => 100,
	// 	'max'            => 200,
	// 	'default_value'   => 144,
	// 	'label'           => 'range',
	// ),
	// array(
	// 	'type'            => 'range',
	// 	'data_type'       => 'meta', // localstorage meta none option
	// 	'data_key'        => 'range_float',

	// 	'float_number'   => true,
	// 	'step'           => 0.1,
	// 	'min'            => 100.2,
	// 	'max'            => 200.2,
	// 	'default_value'   => 140.2,
	// 	'label'           => 'range_float',
	// ),
);

$tab1 = array(
	// 'id'     => 'my-tab',
	'label'  => 'Tab One',
	'panels' => array(
		array(
			// 'id'          => 'my-panel',
			// 'label'          => 'Panel One',
			'with_container' => false,
			// 'initial_open'   => true,
			'settings'       => array(
				array(
					'type'      => 'custom_html',
					'data_type' => 'meta', // localstorage meta none option
					'data_key'  => 'custom_html1',
					'html_string' => '<div class="zzz">zzz</div>',
				),
				// array(
				// 	'type'            => 'checkbox',
				// 	'data_type'       => 'meta', // localstorage meta none option
				// 	'data_key'        => 'checkbox1',

				// 	'default_value'  => true,
				// 	'label'          => 'checkbox',
				// 	'help'           => 'checkbox',
				// ),
				// array(
				// 	'type'            => 'image',
				// 	'data_type'       => 'meta', // localstorage meta none option
				// 	'data_key'        => 'image91',

				// 	// 'multiple'        => true,
				// 	'default_value'   => 168,
				// 	// 'default_value'   => array(168,159),
				// 	'label'           => 'image',
				// ),
			),
		),
	),
);

$tab2 = array(
	// 'id'     => 'my-tab',
	'label'  => 'Tab Two',
	'panels' => array(
		array(
			// 'id'          => 'my-panel',
			// 'label'          => 'Panel One',
			'with_container' => false,
			// 'initial_open'   => true,
			'settings'       => $settings,
		),
	),
);

$tab3 = array(
	// 'id'     => 'my-tab',
	'label'  => 'Tab Three',
	'panels' => array(
		array(
			// 'id'          => 'my-panel',
			// 'label'          => 'Panel One',
			'with_container' => false,
			// 'initial_open'   => true,
			'settings'       => array(
				array(
					'type'            => 'radio',
					'data_type'       => 'meta', // localstorage meta none option
					'data_key'        => 'radio3',

					'default_value'   => 'bbb',
					'label'           => 'radio',
					'options'         => array(
						'aaa' => 'aaa',
						'bbb' => 'bbb',
					),
				),
			),
		),
	),
);

$tab4 = array(
	// 'id'     => 'my-tab',
	'label'  => 'Tab Four',
	'panels' => array(
		array(
			// 'id'          => 'my-panel',
			// 'label'          => 'Panel One',
			'with_container' => false,
			// 'initial_open'   => true,
			'settings'       => array(
				array(
					'type'            => 'radio',
					'data_type'       => 'meta', // localstorage meta none option
					'data_key'        => 'radio4',

					'default_value'   => 'bbb',
					'label'           => 'radio',
					'options'         => array(
						'aaa' => 'aaa',
						'bbb' => 'bbb',
					),
				),
			),
		),
	),
);

$sidebar = array(
	'id'          => 'ebisu_portfolio_settings',
	'label'           => 'a',
	'meta_key_prefix' => 'eps_',
	'post_type' => array('page','post'),
	// 'tabs' => array($tab2, $tab1 ),
	// 'tabs' => array($tab2, $tab1 ),
	// 'tabs' => array( $tab1, $tab2, $tab3 ),
	'tabs' => array( $tab1, $tab2, $tab3, $tab4 ),
// 	'icon_dashicon' => '',
	'icon_svg'      => '<svg width="24" height="24" viewBox="0 0 24 24">
	<script>alert("svg alert")</script>
	<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
	<path fill="none" d="M0 0h24v24H0V0z" />
</svg>',
);

$sidebars[] = $sidebar;

return $sidebars;

}

add_filter( 'ps_create_sidebar', __NAMESPACE__ . '\my_function' );
