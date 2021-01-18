<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting Color
 */
class Color extends Setting
{
	use PreparePalette;

	protected function before_set_schema()
	{
		Setting::before_set_schema();
		$this->props["palette"] = $this->prepare_palette(
			$this->props["palette"]
		);
	}

	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "color",
			"default_value" => "",
			"alpha_control" => false,
			"palette" => [],
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
			"alpha_control" => [
				"type" => "boolean",
				"for_js" => true,
			],
			"palette" => [
				"type" => [
					"_all" => [
						"name" => "id",
						"color" => "text",
					],
				],
				"for_js" => true,
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
