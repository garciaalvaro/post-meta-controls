<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class DateTime extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'date_time',
			'default_value' => '',
			'use_12hour'    => false,
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'use_12hour' => array(
				'type'       => 'boolean',
				'for_js'     => true,
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
