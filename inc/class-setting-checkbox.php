<?php

namespace POSTSETTINGS;

class Checkbox extends Setting {

	protected function get_js_props_type() {
		return array(
			'default_value',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'checkbox',
			'default_value' => false,
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'boolean', ),
		);
		$required_keys = array(
			'label',
		);
		$private_keys = array();
		$conditions = array(
			'label' => 'not_empty',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}
}
