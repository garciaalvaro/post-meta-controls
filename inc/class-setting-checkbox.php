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
			'default_value' => true,
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'bool', ),
		);
		$required_keys = array(
			'label',
		);
		$private_keys = array();
		$non_empty_values = array(
			'label',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return $schema;
	}
}
