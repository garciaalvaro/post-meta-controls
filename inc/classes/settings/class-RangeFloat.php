<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting RangeFloat
 */
class RangeFloat extends Setting
{
	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "range_float",
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
				"type" => "float",
				"for_js" => true,
			],
			"step" => [
				"type" => "float",
				"for_js" => true,
				"conditions" => [
					$this->props["step"] > 0,
					$this->props["max"] - $this->props["min"] >
					$this->props["step"],
				],
			],
			"min" => [
				"type" => "float",
				"for_js" => true,
			],
			"max" => [
				"type" => "float",
				"for_js" => true,
				"conditions" => $this->props["max"] > $this->props["min"],
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
