<?php

namespace POSTSETTINGS;

class Sidebar extends Base {

	protected function get_props_default() {
		return array(
			// 'class_type'  => 'sidebar',
			'id'          => \wp_generate_uuid4(),
			'label'       => '',
			'description' => '',
			// 'icon_url'    => '',// TODO
			'post_type'   => 'post',
		);
	}

	protected function get_props_schema() {
		$schema = array(
			// 'class_type'  => array( 'type' => 'id', ),
			'id'          => array( 'type' => 'id', ),
			'label'       => array( 'type' => 'text', ),
			'description' => array( 'type' => 'text', ),
			// 'icon_url'    => array( 'type' => 'id', ),// TODO
			'post_type'   => array( 'type' => 'id', ),
		);
		$required_keys = array(
			// 'class_type',
			'id',
			'label',
			'post_type',
		);
		$private_keys = array(
			// 'class_type',
		);
		$non_empty_values = array(
			'id',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return $schema;
	}

	protected function post_props_validation() {// TODO: check if this could be set to private

		$this->add_js_filter();

	}
}
