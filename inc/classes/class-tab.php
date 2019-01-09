<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Tab extends Base {

	protected function set_defaults() {
		$this->props_defaults = array(
			'id'        => wp_generate_uuid4(),
			'path'      => array(),
			'label'     => '',
			'post_type' => 'post', // It will be passed through cast_array().
		);
	}

	protected function set_schema() {
		$this->props_schema = array(
			'id' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'path' => array(
				'type'       => array( '_all' => 'id' ),
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
		);
	}
}
