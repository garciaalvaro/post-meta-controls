<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class MultiCheckbox extends Setting {

	protected function before_set_schema() {
		Setting::before_set_schema();
		$this->props['options'] = prepare_options( $this->props['options'] );
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'multi_checkbox',
			'default_value' => '',
			'options'       => array(),
			'use_toggle'    => false,
		);

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'array_id',
				'for_js' => true,
			),
			'options' => array(
				'type'       => 'array_array_text',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'use_toggle' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
