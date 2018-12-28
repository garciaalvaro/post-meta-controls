<?php

namespace POSTSETTINGS;

class CustomHTML extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'        => 'custom_html',
			'html_string' => '',
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'html_string' => array(
				'type'       => 'string',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
