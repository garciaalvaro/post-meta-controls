<?php

namespace POSTSETTINGS;

class Sidebar extends Base {

	public function get_post_type() {
		return $this->props['post_type'];
	}

	public function get_data_key_prefix() {
		return $this->props['data_key_prefix'];
	}

	protected function set_defaults() {
		$this->props_defaults = array(
			'id'              => \wp_generate_uuid4(),
			'label'           => '',
			'post_type'       => 'post',
			'description'     => '',
			'data_key_prefix' => 'ps_',
			'icon'            => 'carrot',
			'use_svg_icon'    => false,
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
				'type'   => 'id_OR_array_id',
				'for_js' => true,
			),
			'description' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'data_key_prefix' => array(
				'type'   => 'id',
				'for_js' => false,
			),
			'icon' => array(
				'type'       => true === $this->props['use_svg_icon'] ? 'html_svg' : 'id',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'use_svg_icon' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);
	}
}
