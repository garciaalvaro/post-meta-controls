<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Image extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'image',
			'default_value' => 0, // It will be passed through cast_array().
			'multiple'      => false,
		);

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => true === $this->props['multiple']
					? array( '_all' => 'integer' )
					: 'integer',
				'for_js' => true,
			),
			'multiple' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
