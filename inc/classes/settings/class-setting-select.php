<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Select extends Setting {

	protected function before_set_schema() {
		Setting::before_set_schema();
		$this->props['options'] = prepare_options( $this->props['options'] );
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'select',
			'default_value' => '', // It will be passed through cast_array().
			'options'       => array(),
			'multiple'      => false,
		);

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => true === $this->props['multiple']
					? array( '_all' => 'id' )
					: 'id',
				'for_js' => true,
			),
			'options' => array(
				'type'       => array(
					'_all' => array(
						'value' => 'id',
						'label' => 'text',
					),
				),
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'multiple' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
