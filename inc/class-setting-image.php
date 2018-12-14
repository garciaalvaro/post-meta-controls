<?php

namespace POSTSETTINGS;

class Image extends Setting {

	protected function get_js_props_type() {
		return array(
			'default_value',
			'multiple',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'image',
			'default_value' => array(),
			'multiple'      => false,
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'integer', ),
			'multiple'      => array( 'type' => 'boolean', ),
		);
		$required_keys = array(
			'label',
		);
		$private_keys = array();
		$conditions = array(
			'label'   => 'not_empty',
		);

		if (
			! empty( $this->props['multiple'] ) &&
			true === $this->props['multiple']
		) {
			$default_type = \wp_parse_args(
				array(
					'default_value' => array( 'type' => 'array_integer', ),
				),
				$default_type
			);
		}

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}
}
