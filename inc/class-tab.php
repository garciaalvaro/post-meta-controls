<?php

namespace POSTSETTINGS;

class Tab extends Base {

	protected function get_props_default() {
		return array(
			// 'class_type' => 'tab',
			'id'         => '',
			'path'       => array(),
			'index'      => '',
			'label'      => '',
			'post_type'  => 'post',
		);
	}

	protected function get_props_schema() {
		$schema = array(
			// 'class_type' => array( 'type' => 'id', ),
			'id'         => array( 'type' => 'id', ),
			'path'       => array( 'type' => 'array_string', ),
			'index'      => array( 'type' => 'integer', ),
			'label'      => array( 'type' => 'text', ),
			'post_type'  => array( 'type' => 'id', ),
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
		);
		$non_empty_values = array(
			'id',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return $schema;
	}

	protected function pre_props_validation() {// TODO: check if this could be set to private

		$this->assign_prop_id();

	}

	protected function post_props_validation() {// TODO: check if this could be set to private

		$this->add_js_filter();

	}
}
