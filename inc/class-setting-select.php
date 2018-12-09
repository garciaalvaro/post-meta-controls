<?php

namespace POSTSETTINGS;

class Select extends Setting {

	protected function get_js_props_type() {
		return array(
			'options',
			'default_value',
			'multiple',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'select',
			'default_value' => '',
			'multiple'      => false,
			'options'       => array(),
		);

		if (
			! empty( $this->props['multiple'] ) &&
			true === $this->props['multiple']
		) {
			$default_type = \wp_parse_args(
				array(
					'default_value' => array(),
				),
				$default_type
			);
		}

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'id', ),
			'multiple'      => array( 'type' => 'bool', ),
			'options'       => array( 'type' => 'array_array_string', ),
		);
		$required_keys = array(
			'label',
			'options',
		);
		$private_keys = array();
		$non_empty_values = array(
			'label',
			'options',
		);

		if (
			! empty( $this->props['multiple'] ) &&
			true === $this->props['multiple']
		) {
			$schema = \wp_parse_args(
				array(
					'default_value' => array( 'type' => 'array', ),
				),
				$schema
			);
		}

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return $schema;
	}

	protected function pre_clean_props() {
		$this->prepare_options();
	}

	private function prepare_options() {

		if ( empty( $this->props['options'] ) ) {
			return;
		}

		$options_clean = array();

		foreach ( $this->props['options'] as $key => $value ) {
			if ( ! is_string( $key ) || ! is_string( $value ) ) {
				continue;
			}

			$options_clean[] = array(
				'value' => $key,
				'label' => $value,
			);
		}

		$this->props['options'] = $options_clean;
	}
}
