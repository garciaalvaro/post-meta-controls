<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Panel extends Base {

	protected function set_defaults() {
		$this->props_defaults = array(
			'id'             => wp_generate_uuid4(),
			'path'           => array(),
			'label'          => '',
			'post_type'      => 'post',
			'initial_open'   => false,
			'with_container' => true,
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
				'type'       => 'array_id',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'label' => array(
				'type'       => 'text',
				'for_js'     => true,
				'conditions' => true === $this->props['with_container'] ? 'not_empty' : false,
			),
			'post_type' => array(
				'type'   => 'id_OR_array_id',
				'for_js' => false,
			),
			'initial_open' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
			'with_container' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);
	}
}
