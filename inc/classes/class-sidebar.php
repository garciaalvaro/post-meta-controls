<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Sidebar extends Base {

	public function get_data_key_prefix() {
		return $this->props['data_key_prefix'];
	}

	protected function set_defaults() {
		$this->props_defaults = array(
			'id'              => wp_generate_uuid4(),
			'label'           => '',
			'post_type'       => 'post', // It will be passed through cast_array().
			'description'     => '',
			'data_key_prefix' => 'pmc_',
			'icon_dashicon'   => 'carrot',
			'icon_svg'        => false,
		);
	}

	protected function set_schema() {
		$this->props_schema = array(
			'id' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'label' => array(
				'type'       => 'text',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'post_type' => array(
				'type'   => array( '_all' => 'id' ),
				'for_js' => false,
			),
			'description' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'data_key_prefix' => array(
				'type'   => 'id',
				'for_js' => false,
			),
			'icon_dashicon' => array(
				'type'   => 'id',
				'for_js' => true,
			),
			'icon_svg' => array(
				'type'   => 'html_svg',
				'for_js' => true,
			),
		);
	}
}
