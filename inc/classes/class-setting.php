<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

abstract class Setting extends Base {

	abstract protected function set_defaults();
	abstract protected function set_schema();

	protected function before_set_schema() {// TODO: check if this could be set to private
		$this->prepare_data_type();
		$this->set_data_key_with_prefix();
	}

	protected function set_data_key_with_prefix() {

		if ( empty( $this->props['data_key'] ) ) {
			return;
		}

		$prefix = 'ps_' !== $this->props['data_key_prefix']
			? $this->props['data_key_prefix']
			: $this->props['data_key_prefix_from_sidebar'];

		$this->props['data_key_with_prefix'] = $prefix . $this->props['data_key'];
	}

	public function set_metadata_exists() {

		if (
			true !== $this->props['valid'] ||
			'meta' !== $this->props['data_type']
		) {
			return;
		}

		$this->props['metadata_exists'] =
			metadata_exists(
				'post',
				get_the_ID(),
				$this->props['data_key_with_prefix']
			);
	}

	public function register_meta() {

		if (
			true !== $this->props['valid'] ||
			'meta' !== $this->props['data_type']
		) {
			return;
		}

		$props = $this->props;
		$type  = 'range' === $props['type'] && true === $props['float_number']
			? 'range_float'
			: $props['type'];
		$meta_type     = get_meta_arg_type( $type );
		$meta_sanitize = get_meta_arg_sanitize( $type, $props );
		$meta_single   = get_meta_arg_single( $type, $props );
		$post_types    = $this->props['post_type'];
		$post_types    = is_string( $post_types )
			? array( $post_types )
			: $post_types;

		foreach ( $post_types as $post_type) {

			register_post_meta(
				$post_type,
				$props['data_key_with_prefix'],
				array(
					'show_in_rest'      => true,
					'single'            => $meta_single,
					'type'              => $meta_type,
					'sanitize_callback' => $meta_sanitize,
				)
			);
		}
	}

	private function prepare_data_type() {
		$types_can_have_meta = array(
			'checkbox',
			'radio',
			'select',
			'range',
			'text',
			'textarea',
			'color',
			'image',
			'date_time',
			'buttons',
		);
		if (
			'meta' === $this->props['data_type'] &&
			in_array( $this->props['type'], $types_can_have_meta )
		) {
			return;
		}

		$types_can_have_localstorage = array(
			'checkbox',
			'radio',
			'select',
			'range',
			'color',
			'date_time',
			'buttons',
		);
		if (
			'localstorage' === $this->props['data_type'] &&
			in_array( $this->props['type'], $types_can_have_localstorage )
		) {
			return;
		}

		$this->props['data_type'] = 'none';
		$this->props['data_key']  = '';
	}

	protected function set_privates() {
		$this->props_privates = array(
			'data_key_with_prefix',
			'metadata_exists',
		);
	}

	protected function get_defaults() {
		return array(
			'id'                           => wp_generate_uuid4(),
			'path'                         => array(),
			'label'                        => '',
			'post_type'                    => 'post',
			'type'                         => '',
			'description'                  => '',
			'help'                         => '',
			'data_type'                    => 'none',
			'metadata_exists'              => false,
			'data_key'                     => '',
			'data_key_prefix'              => 'ps_',
			'data_key_with_prefix'         => '',
			'data_key_prefix_from_sidebar' => '',
		);
	}

	protected function get_schema() {
		return array(
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
				'type'   => 'text',
				'for_js' => true,
			),
			'post_type' => array(
				'type'   => 'id_OR_array_id',
				'for_js' => false,
			),
			'type' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'description' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'help' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'data_type' => array(
				'type'   => 'id',
				'for_js' => true,
			),
			'metadata_exists' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
			'data_key' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'none' !== $this->props['data_type'] ? 'not_empty' : false,
			),
			'data_key_prefix' => array(
				'type'   => 'id',
				'for_js' => true,
			),
			'data_key_prefix_from_sidebar' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'none' !== $this->props['data_type'] ? 'not_empty' : false,
			),
			'data_key_with_prefix' => array(
				'type'       => 'id',
				'for_js'     => true,
				'conditions' => 'none' !== $this->props['data_type'] ? 'not_empty' : false,
			),
		);
	}
}
