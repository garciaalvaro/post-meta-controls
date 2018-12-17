<?php

namespace POSTSETTINGS;

class Image extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'image',
			'default_value' => 0,
			'multiple'      => false,
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			\wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'integer_OR_array_integer',
				'for_js' => true,
			),
			'multiple' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			\wp_parse_args( $this_schema, $parent_schema );
	}
}
