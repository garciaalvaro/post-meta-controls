<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting Range
 */
class Range extends Setting
{
	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "range",
			"default_value" => 50,
			"step" => 1,
			"min" => 0,
			"max" => 100,
		];

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults = wp_parse_args($this_defaults, $parent_defaults);
	}

	protected function set_schema()
	{
		$this_schema = [
			"default_value" => [
				"type" => "integer",
				"for_js" => true,
			],
			"step" => [
				"type" => "integer",
				"for_js" => true,
				"conditions" => [
					$this->props["step"] > 0,
					$this->props["max"] - $this->props["min"] >
					$this->props["step"],
				],
			],
			"min" => [
				"type" => "integer",
				"for_js" => true,
			],
			"max" => [
				"type" => "integer",
				"for_js" => true,
				"conditions" => $this->props["max"] > $this->props["min"],
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
