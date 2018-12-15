<?php


namespace POSTSETTINGS;

function my_function() {

	$svg = '<svg class="we qweqwe" width="24" height="24" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
</svg>';

$test1 = array(
	'id'              => 'my-sidebar',
	'label'           => 'a',
	'meta_key_prefix' => 'sideb_',
	'icon_type'       => 'svg',// dashicon/nada svg
	'icon'            => $svg,
	// 'icon'            => 'carrot',
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
						// 	'data_key'        => 'select',

						// 	'default_value'   => 'bbb',
						// 	'label'           => 'select',
						// 	'options'         => array(
						// 		'aaa' => 'aaa',
						// 		'bbb' => 'bbb',
						// 	),
						// ),
						// array(
						// 	'type'            => 'select',
						// 	'data_type'       => 'meta', // localstorage meta none option
						// 	'data_key'        => 'select_multiple',

						// 	'multiple'        => true,
						// 	'default_value'   => ['bbb'],
						// 	'label'           => 'select_multiple',
						// 	'options'         => array(
						// 		'aaa' => 'aaa',
						// 		'bbb' => 'bbb',
						// 	),
						// ),
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
						array(
							'type'            => 'checkbox',
							'data_type'       => 'meta', // localstorage meta none option
							'data_key'        => 'checkbox',

							'default_value'  => true,
							'label'          => 'checkbox',
							'help'           => 'checkbox',
						),
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
						// 	'data_key'        => 'textarea',

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
					),
				),
			),
		),
	),
);

ps_create_sidebar( $test1 );

}

// \add_action( 'ps_init', __NAMESPACE__ . '\my_function' );
