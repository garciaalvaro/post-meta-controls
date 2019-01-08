<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Select extends Setting {

	protected function before_set_schema() {
		parent::before_set_schema();
		// parent::set_data_key_with_prefix();
		$this->prepare_options();
	}

	private function prepare_options() {

		if ( empty( $this->props['options'] ) ) {
			return;
		}

		$options_clean = array();

		foreach ( $this->props['options'] as $key => $value ) {
			if (
				( ! is_string( $key ) && ! is_int( $key ) ) ||
				( ! is_string( $value ) && ! is_int( $value ) )
			) {
				continue;
			}

			$options_clean[] = array(
				'value' => sanitize_id( $key ),
				'label' => sanitize_text( $value ),
			);
		}

		$this->props['options'] = $options_clean;
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'select',
			'default_value' => '',
			'options'       => array(),
			'multiple'      => false,
		);

		$parent_defaults = parent::get_defaults();

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

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
