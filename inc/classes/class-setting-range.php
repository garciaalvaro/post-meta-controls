<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Range extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'range',
			'default_value' => 0,
			'step'          => 1,
			'min'           => 0,
			'max'           => 1,
			'float_number'  => false,
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => true === $this->props['float_number'] ? 'float' : 'integer',
				'for_js' => true,
			),
			'step' => array(
				'type'       => true === $this->props['float_number'] ? 'float' : 'integer',
				'for_js'     => true,
				'conditions' => array(
					$this->props['step'] > 0,
					( $this->props['max'] - $this->props['min'] ) > $this->props['step'],
				),
			),
			'min' => array(
				'type'   => true === $this->props['float_number'] ? 'float' : 'integer',
				'for_js' => true,
			),
			'max' => array(
				'type'       => true === $this->props['float_number'] ? 'float' : 'integer',
				'for_js'     => true,
				'conditions' => $this->props['max'] > $this->props['min'],
			),
			'float_number' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
