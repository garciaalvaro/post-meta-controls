<?php

namespace POSTSETTINGS;

class Radio extends Setting {

	protected function get_props_default_type() {
		return array(
			'type'            => 'radio',
			'default'         => '',
			'meta_type'       => 'string',
			'options'         => array(),
		);
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default' => array( 'type' => 'id', ),
			'options' => array( 'type' => 'array_array_string', ),
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
