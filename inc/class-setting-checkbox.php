<?php

namespace POSTSETTINGS;

class Checkbox extends Setting {

	protected function get_props_default_type() {
		return array(
			'type'      => 'checkbox',
			'default'   => true,
			'meta_type' => 'boolean',
		);
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default' => array( 'type' => 'bool', ),
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
