<?php

namespace POSTSETTINGS;

abstract class Setting extends Base {

	abstract protected function get_props_default_type();
	abstract protected function get_props_schema_type();
	abstract protected function get_js_props_type();

	protected function get_js_props() {
		$props_for_js_type = $this->get_js_props_type();
		$props_for_js      = array(
			'id',
			'data_type',
			'path',
			// 'index',
			'type',
			'label',
			'description',
			'help',
			// 'post_type',
		);

		if (
			! empty( $this->props['data_type'] ) &&
			(
				'meta' === $this->props['data_type'] ||
				'localstorage' === $this->props['data_type']
			)
		) {
			$props_for_js = \wp_parse_args(
				array(
					'data_key_with_prefix',
				),
				$props_for_js
			);
		}

		return \wp_parse_args( $props_for_js_type, $props_for_js );
	}

	protected function get_props_default() {
		$default_type = $this->get_props_default_type();
		$default      = array(
			'id'          => '',
			'data_type'   => 'none',
			'path'        => array(),
			'index'       => '',
			'type'        => '',
			'label'       => '',
			'description' => '',
			'help'        => '',
			'post_type'   => 'post',
		);

		if (
			! empty( $this->props['data_type'] ) &&
			(
				'meta' === $this->props['data_type'] ||
				'localstorage' === $this->props['data_type']
			)
		) {
			$default = \wp_parse_args(
				array(
					'types_can_have_meta'          => array(
						'checkbox',
						'radio',
						'select',
						'range',
					),
					'data_key'                     => '',
					'data_key_prefix'              => 'ps_',
					'data_key_prefix_from_sidebar' => '',
					'data_key_with_prefix'         => '',
				),
				$default
			);
		}

		return \wp_parse_args( $default_type, $default );
	}

	protected function get_props_schema() {
		$schema_type = $this->get_props_schema_type();
		$schema      = array(
			'id'          => array( 'type' => 'id', ),
			'data_type'   => array( 'type' => 'id', ),
			'path'        => array( 'type' => 'array_string', ),
			'index'       => array( 'type' => 'integer', ),
			'type'        => array( 'type' => 'id', ),
			'label'       => array( 'type' => 'text', ),
			'description' => array( 'type' => 'text', ),
			'help'        => array( 'type' => 'text', ),
			'post_type'   => array( 'type' => 'id', ),
		);
		$required_keys = array(
			'id',
			'path',
			'index',
			'type',
			'post_type',
			// TODO default here? radio must have a default even if it is empty
		);
		$private_keys = array(
			'id',
		);
		$conditions = array(
			'id' => 'not_empty',
		);

		if (
			! empty( $this->props['data_type'] ) &&
			(
				'meta' === $this->props['data_type'] ||
				'localstorage' === $this->props['data_type']
			)
		) {
			$schema = \wp_parse_args(
				array(
					'types_can_have_meta'          => array( 'type' => 'array_string', ),
					'data_key'                     => array( 'type' => 'id', ),
					'data_key_prefix'              => array( 'type' => 'id', ),
					'data_key_prefix_from_sidebar' => array( 'type' => 'id', ),
					'data_key_with_prefix'         => array( 'type' => 'id', ),
				),
				$schema
			);
			$required_keys = \wp_parse_args(
				array(
					'types_can_have_meta',
					'data_key',
					'data_key_with_prefix',
				),
				$required_keys
			);
			$private_keys = \wp_parse_args(
				array(
					'types_can_have_meta',
					'data_key_with_prefix',
				),
				$private_keys
			);
			$conditions = \wp_parse_args(
				array(
					'data_key_with_prefix' => 'not_empty',
					'data_key'             => 'not_empty',
				),
				$conditions
			);
		}

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return \wp_parse_args( $schema_type, $schema );
	}

	protected function pre_props_validation() {// TODO: check if this could be set to private

		$this->assign_prop_id();
		$this->assign_prop_data_key_prefix();

	}

	protected function post_props_validation() {// TODO: check if this could be set to private

		$this->register_meta();

	}

	private function assign_prop_data_key_prefix() {

		if ( empty( $this->props['data_key'] ) ) {
			return;
		}

		$prefix = 'ps_' !== $this->props['data_key_prefix']
			? $this->props['data_key_prefix']
			: $this->props['data_key_prefix_from_sidebar'];

		$this->props['data_key_with_prefix'] = $prefix . $this->props['data_key'];
	}

	public function register_meta() {

		if (
			true !== $this->props['valid'] ||
			'meta' !== $this->props['data_type'] ||
			// empty( $this->props['type'] ) ||
			// empty( $this->props['types_can_have_meta'] ) ||
			! in_array( $this->props['type'], $this->props['types_can_have_meta'] )
		) {
			return;
		}

		$props              = $this->props;
		$props['meta_type'] = get_meta_type( $props );

		\add_action( 'init', function() use ( $props ) {
			\register_post_meta(
				$props['post_type'],
				$props['data_key_with_prefix'],
				array(
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => $props['meta_type'],
					'sanitize_callback' => function( $value ) use ( $props ) {

						if ( 'radio' === $props['type'] || 'select' === $props['type'] ) {

							$options       = $this->props['options'];
							$default_value = $this->props['default_value'];

							return sanitize_options(
								$value,
								$options,
								$default_value,
								'select' === $props['type'] && true === $props['multiple']
							);

						} elseif ( 'checkbox' === $props['type'] ) {

							return sanitize_bool( $value );

						} elseif ( 'range' === $props['type'] ) {

							return sanitize_range( $value, $props );

						}

						return '';// TODO: return?
					},
				)
			);
		} );
	}
}
