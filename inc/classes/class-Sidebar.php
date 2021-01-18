<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Class Base Sidebar
 */
class Sidebar extends Base
{
	protected function after_cast_props()
	{
		$this->set_id_with_prefix();
	}

	public function get_data_key_prefix()
	{
		return $this->props["data_key_prefix"];
	}

	public function get_id_prefix()
	{
		return $this->props["id_prefix"];
	}

	protected function set_defaults()
	{
		$this->props_defaults = [
			"id" => wp_generate_uuid4(),
			"id_prefix" => "",
			"label" => "",
			"post_type" => "post", // It will be passed through cast_array().
			"data_key_prefix" => "pmc_",
			"icon_dashicon" => "carrot",
			"icon_svg" => "",
			"ui_color_scheme" => "light",
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
			"label" => [
				"type" => "text",
				"for_js" => true,
				"conditions" => "not_empty",
			],
			"post_type" => [
				"type" => ["_all" => "id"],
				"for_js" => false,
			],
			"data_key_prefix" => [
				"type" => "id",
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
			"ui_color_scheme" => [
				"type" => "id",
				"for_js" => true,
			],
		];
	}
}
