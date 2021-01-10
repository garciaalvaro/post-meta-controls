<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Setting CheckboxMultiple
 */
class CheckboxMultiple extends Setting
{
	use PrepareOptions;

	protected function before_set_schema()
	{
		Setting::before_set_schema();
		$this->props["options"] = $this->prepare_options(
			$this->props["options"]
		);
	}

	protected function set_defaults()
	{
		$this_defaults = [
			"type" => "checkbox_multiple",
			"default_value" => "", // It will be passed through cast_array().
			"options" => [],
			"use_toggle" => false,
		];

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults = wp_parse_args($this_defaults, $parent_defaults);
	}

	protected function set_schema()
	{
		$this_schema = [
			"default_value" => [
				"type" => ["_all" => "id"],
				"for_js" => true,
			],
			"options" => [
				"type" => [
					"_all" => [
						"value" => "id",
						"label" => "text",
					],
				],
				"for_js" => true,
				"conditions" => "not_empty",
			],
			"use_toggle" => [
				"type" => "boolean",
				"for_js" => true,
			],
		];

		$parent_schema = Setting::get_schema();

		$this->props_schema = wp_parse_args($this_schema, $parent_schema);
	}
}
