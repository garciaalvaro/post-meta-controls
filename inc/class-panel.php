<?php

namespace POSTSETTINGS;

class Panel extends Base {

	protected function get_js_props() {
		return array(
			'id',
			'path',
			// 'index',
			'label',
			'initial_open',
			'with_container',
			// 'post_type',
		);
	}

	protected function get_props_default() {
		return array(
			'id'             => '',
			'path'           => array(),
			'index'          => '',
			'label'          => '',
			'initial_open'   => false,
			'with_container' => true,
			'post_type'      => 'post',
		);
	}

	protected function get_props_schema() {
		$schema = array(
			// 'class_type'     => array( 'type' => 'id', ),
			'id'             => array( 'type' => 'id', ),
			'path'           => array( 'type' => 'array_string', ),
			'index'          => array( 'type' => 'integer', ),
			'label'          => array( 'type' => 'text', ),
			'initial_open'   => array( 'type' => 'bool', ),
			'with_container' => array( 'type' => 'bool', ),
			'post_type'      => array( 'type' => 'id', ),
		);
		$required_keys = array(
			// 'class_type',
			'id',
			'path',
			'index',
			'label',
			'post_type',
		);
		$private_keys = array(
			// 'class_type',
			'id',
		);
		$conditions = array(
			'id' => 'not_empty',
		);

		$schema = set_schema($schema, $required_keys, $private_keys, $conditions);

		return $schema;
	}

	protected function pre_props_validation() {// TODO: check if this could be set to private

		$this->assign_prop_id();

	}
}
