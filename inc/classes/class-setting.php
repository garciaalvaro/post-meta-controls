<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

abstract class Setting extends Base {

	abstract protected function set_defaults();
	abstract protected function set_schema();

	public function get_setting_type() {
		return $this->props['type'];
	}

	protected function before_set_schema() {
		$this->prepare_data_type();
		$this->set_data_key_with_prefix();
	}

	protected function set_data_key_with_prefix() {

		if ( empty( $this->props['data_key'] ) ) {
			return;
		}

		$prefix = false !== $this->props['data_key_prefix']
			? $this->props['data_key_prefix']
			: $this->props['data_key_prefix_from_sidebar'];

		$prefix = (string) $prefix;

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
			'meta' !== $this->props['data_type'] ||
			true !== $this->props['register_meta']
		) {
			return;
		}

		$props         = $this->props;
		$type          = $props['type'];
		$meta_type     = get_meta_type( $type );
		$meta_sanitize = get_meta_sanitize( $type, $props );
		$meta_single   = get_meta_single( $type );
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
			'buttons',
			'checkbox',
			'checkbox_multiple',
			'color',
			'date_range',
			'date_single',
			'image',
			'image_multiple',
			'radio',
			'range',
			'range_float',
			'select',
			'text',
			'textarea',
		);
		if (
			'meta' === $this->props['data_type'] &&
			in_array( $this->props['type'], $types_can_have_meta )
		) {
			return;
		}

		$types_can_have_localstorage = array(
			'buttons',
			'checkbox',
			'checkbox_multiple',
			'color',
			'date_range',
			'date_single',
			'radio',
			'range',
			'range_float',
			'select',
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
			'post_type'                    => 'post', // It will be passed through cast_array().
			'type'                         => '',
			'description'                  => '',
			'help'                         => '',
			'data_type'                    => 'none',
			'metadata_exists'              => false,
			'data_key'                     => '',
			'data_key_prefix'              => false,
			'data_key_with_prefix'         => '',
			'data_key_prefix_from_sidebar' => '',
			'register_meta'                => true,
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
				'type'       => array( '_all' => 'id' ),
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'label' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'post_type' => array(
				'type'   => array( '_all' => 'id' ),
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
				'for_js'     => false,
				'conditions' => 'none' !== $this->props['data_type']
					? 'not_empty'
					: false,
			),
			'data_key_prefix' => array(
				'type'   => 'id',
				'for_js' => false,
			),
			'data_key_prefix_from_sidebar' => array(
				'type'   => 'id',
				'for_js' => false,
			),
			'data_key_with_prefix' => array(
				'type'   => 'id',
				'for_js' => true,
			),
			'register_meta' => array(
				'type'   => 'boolean',
				'for_js' => false,
			),
		);
	}
}
