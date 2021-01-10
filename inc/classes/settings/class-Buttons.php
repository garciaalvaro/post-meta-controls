<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting Buttons
 */
class Buttons extends Setting
{
	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "buttons",
			"default_value" => "",
			"allow_empty" => false,
			"options" => [],
		];

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults = wp_parse_args($this_defaults, $parent_defaults);
	}

	protected function set_schema()
	{
		$this_schema = [
			"default_value" => [
				"type" => "id",
				"for_js" => true,
			],
			"allow_empty" => [
				"type" => "boolean",
				"for_js" => true,
			],
			"options" => [
				"type" => [
					"_all" => [
						"value" => "id",
						"title" => "text",
						"icon_dashicon" => "id",
						"icon_svg" => "html_svg",
					],
				],
				"for_js" => true,
				"conditions" => "not_empty",
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
