<?php

namespace POSTSETTINGS;

class Range extends Setting {

	protected function get_js_props_type() {
		return array(
			'default_value',
			'step',
			'min',
			'max',
			'float_number',
		);
	}

	protected function get_props_default_type() {
		$default_type = array(
			'type'          => 'range',
			'default_value' => 0,
			'step'          => 1,
			'min'           => 0,
			'max'           => 1,
			'float_number'  => false,
		);

		return $default_type;
	}

	protected function get_props_schema_type() {
		$schema = array(
			'default_value' => array( 'type' => 'integer', ),
			'step'          => array( 'type' => 'integer', ),
			'min'           => array( 'type' => 'integer', ),
			'max'           => array( 'type' => 'integer', ),
			'float_number'  => array( 'type' => 'bool', ),
		);

		if (
			! empty( $this->props['float_number'] ) &&
			true === $this->props['float_number']
		) {
			$schema = \wp_parse_args(
				array(
					'step' => array( 'type' => 'float', ),
					'min'  => array( 'type' => 'float', ),
					'max'  => array( 'type' => 'float', ),
				),
				$schema
			);
		}

		$required_keys = array(
			'label',
			'min',
			'max',
		);
		$private_keys = array();
		$conditions = array(
			'label' => 'not_empty',
			'step'  => array(
				array(
					'argument_1'         => 'step',
					'operator'           => 'greater_than',
					'argument_2'         => 0,
					'argument_2_is_prop' => false,
				),
			),
			'min'   => array(
				array(
					'argument_1'         => 'max',
					'operator'           => 'greater_than',
					'argument_2'         => 'min',
					'argument_2_is_prop' => true,
				),
			),
			'max'   => array(
				array(
					'argument_1'         => 'max',
					'operator'           => 'greater_than',
					'argument_2'         => 'min',
					'argument_2_is_prop' => true,
				),
				array(
					'argument_1'         => 'max',
					'operator'           => 'greater_than',
					'argument_2'         => 0,
					'argument_2_is_prop' => false,
				),
			),
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}
}
