<?php

namespace POSTSETTINGS;

class Sidebar extends Base {

	protected function get_js_props() {
		return array(
			'id',
			'label',
			'description',
		);
	}

	protected function get_props_default() {
		return array(
			'id'              => \wp_generate_uuid4(),
			'label'           => '',
			'description'     => '',
			// 'icon_url'    => '',// TODO
			'post_type'       => 'post',
			'data_key_prefix' => 'ps_',
		);
	}

	protected function get_props_schema() {
		$schema = array(
			'id'              => array( 'type' => 'id', ),
			'label'           => array( 'type' => 'text', ),
			'description'     => array( 'type' => 'text', ),
			// 'icon_url'    => array( 'type' => 'id', ),// TODO
			'post_type'       => array( 'type' => 'id', ),
			'data_key_prefix' => array( 'type' => 'id', ),
		);
		$required_keys = array(
			'id',
			'label',
			'post_type',
		);
		$private_keys = array();
		$conditions = array(
			'id' => 'not_empty',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}

	public function get_data_key_prefix() {
		return $this->props['data_key_prefix'];
	}
}
