<?php

namespace POSTSETTINGS;

class Tab extends Base {

	protected function set_defaults() {
		$this->props_defaults = array(
			'id'    => \wp_generate_uuid4(),
			'path'  => array(),
			'label' => '',
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
				'conditions' => 'not_empty',
			),
		);
	}
}
