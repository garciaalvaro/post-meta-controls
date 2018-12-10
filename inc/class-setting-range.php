<?php

namespace POSTSETTINGS;

class Range extends Setting {

	protected function get_js_props_type() {
		return array(
			'default_value',
			'min',
			'max',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'range',
			'default_value' => 0,
			'min'           => 0,
			'max'           => 1,
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'integer', ),
			'min'           => array( 'type' => 'integer', ),
			'max'           => array( 'type' => 'integer', ),
		);
		$required_keys = array(
			'label',
			'min',
			'max',
		);
		$private_keys = array();
		$non_empty_values = array(
			'label',
			'min',
			'max',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return $schema;
	}
}
