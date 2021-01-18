<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

class Tab extends Base
{
	protected function after_cast_props()
	{
		$this->set_id_with_prefix();
	}

	protected function set_defaults()
	{
		$this->props_defaults = [
			"id" => wp_generate_uuid4(),
			"id_prefix" => "",
			"path" => [],
			"label" => "",
			"post_type" => "post", // It will be passed through cast_array().
			"icon_dashicon" => "",
			"icon_svg" => "",
		];
	}

	protected function set_schema()
	{
		$this->props_schema = [
			"id" => [
				"type" => "id",
				"for_js" => true,
				"conditions" => "not_empty",
			],
			"id_prefix" => [
				"type" => "id",
				"for_js" => true,
			],
			"path" => [
				"type" => ["_all" => "id"],
				"for_js" => true,
				"conditions" => "not_empty",
			],
			"label" => [
				"type" => "text",
				"for_js" => true,
				"conditions" => "not_empty",
			],
			"post_type" => [
				"type" => ["_all" => "id"],
				"for_js" => false,
			],
			"icon_dashicon" => [
				"type" => "id",
				"for_js" => true,
			],
			"icon_svg" => [
				"type" => "html_svg",
				"for_js" => true,
			],
		];
	}
}
