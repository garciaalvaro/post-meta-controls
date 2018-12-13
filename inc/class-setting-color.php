<?php

namespace POSTSETTINGS;

class Color extends Setting {

	protected function get_js_props_type() {
		return array(
			'palette',
			'default_value',
			'alpha',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'color',
			'default_value' => '',
			'alpha' => false,
			'palette'       => array(),
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'id', ),
			'alpha'         => array( 'type' => 'boolean', ),
			'palette'       => array( 'type' => 'array_array_string', ),
		);
		$required_keys = array(
			'label',
			'palette',
		);
		$private_keys = array();
		$conditions = array(
			'label'   => 'not_empty',
			'palette' => 'not_empty',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}

	protected function pre_clean_props() {
		$this->prepare_palette();
	}

	private function prepare_palette() {

		if ( empty( $this->props['palette'] ) ) {
			return;
		}

		$palette_clean = array();

		foreach ( $this->props['palette'] as $key => $value ) {
			if ( ! is_string( $key ) || ! is_string( $value ) ) {
				continue;
			}

			$palette_clean[] = array(
				'name' => $key,
				'color' => $value,
			);
		}

		$this->props['palette'] = $palette_clean;
	}
}
