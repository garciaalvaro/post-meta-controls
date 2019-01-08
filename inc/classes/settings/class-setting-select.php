<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Select extends SettingWithOptions {

	protected function before_set_schema() {
		Setting::before_set_schema();
		SettingWithOptions::prepare_options();
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'select',
			'default_value' => '',
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
				'type'   => 'id_OR_array_id',
				'for_js' => true,
			),
			'options' => array(
				'type'       => 'array_array_text',
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
