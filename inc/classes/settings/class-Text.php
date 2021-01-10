<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting Text
 */
class Text extends Setting
{
	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "text",
			"default_value" => "",
			"placeholder" => "",
		];

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults = wp_parse_args($this_defaults, $parent_defaults);
	}

	protected function set_schema()
	{
		$this_schema = [
			"default_value" => [
				"type" => "text",
				"for_js" => true,
			],
			"placeholder" => [
				"type" => "text",
				"for_js" => true,
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
