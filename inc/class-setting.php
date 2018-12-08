<?php

namespace POSTSETTINGS;

abstract class Setting extends Base {

	abstract protected function get_props_default_type();
	abstract protected function get_props_schema_type();

	protected function get_props_default() {
		$default_type = $this->get_props_default_type();
		$default = array(
			'id'                  => '',
			'path'                => array(),
			'index'               => '',
			'type'                => '',
			'label'               => '',
			'description'         => '',
			'default'             => '',
			'help'                => '',
			'post_type'           => 'post',
			'meta_type'           => 'string',
			'meta_key'            => '',
			'meta_key_prefix'     => 'ps_',
			'meta_key_prefix_from_sidebar' => '',
			'types_can_have_meta' => array(
				'checkbox',
				'radio',
			),
		);

		return \wp_parse_args( $default_type, $default );
	}

	protected function get_props_schema() {
		$schema_type = $this->get_props_schema_type();
		$schema = array(
			'id'                  => array( 'type' => 'id', ),
			'path'                => array( 'type' => 'array_string', ),
			'index'               => array( 'type' => 'integer', ),
			'type'                => array( 'type' => 'id', ),
			'label'               => array( 'type' => 'text', ),
			'description'         => array( 'type' => 'text', ),
			'default'             => array( 'type' => 'id', ),
			'help'                => array( 'type' => 'text', ),
			'post_type'           => array( 'type' => 'id', ),
			'meta_type'           => array( 'type' => 'id', ),
			'meta_key'            => array( 'type' => 'id', ),
			'meta_key_prefix'     => array( 'type' => 'id', ),
			'meta_key_prefix_from_sidebar' => array( 'type' => 'id', ),
			'types_can_have_meta' => array( 'type' => 'array_string', ),
		);
		$required_keys = array(
			'id',
			'path',
			'index',
			'type',
			'post_type',
			'types_can_have_meta',
			// TODO default here? radio must have a default even if it is empty
		);
		$private_keys = array(
			'types_can_have_meta',
			'id',
			'meta_type',
		);
		$non_empty_values = array(
			'id',
			'meta_key',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $non_empty_values );

		return \wp_parse_args( $schema_type, $schema );
	}

	protected function pre_props_validation() {// TODO: check if this could be set to private

		$this->assign_prop_id();
		$this->assign_prop_meta_prefix();

	}

	protected function post_props_validation() {// TODO: check if this could be set to private

		$this->add_js_filter();
		$this->register_meta();

	}

	private function assign_prop_meta_prefix() {

		if ( empty( $this->props['meta_key'] ) ) {
			return;
		}

		$prefix = 'ps_' !== $this->props['meta_key_prefix']
			? $this->props['meta_key_prefix']
			: $this->props['meta_key_prefix_from_sidebar'];

		$this->props['meta_key'] = $prefix . $this->props['meta_key'];
	}

	public function register_meta() {

		if (
			true !== $this->props['valid'] ||
			empty( $this->props['type'] ) ||
			empty( $this->props['types_can_have_meta'] ) ||
			! in_array( $this->props['type'], $this->props['types_can_have_meta'] )
		) {
			return;
		}

		$props = $this->props;

		\add_action( 'init', function() use ( $props ) {
			\register_post_meta( $props['post_type'], $props['meta_key'], array(
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => $props['meta_type'],
				'sanitize_callback' => function( $value ) use ( $props ) {

					if ( 'radio' === $props['type'] ) {

						$options = $this->props['options'];
						$default = $this->props['default'];

						return sanitize_options( $value, $options, $default );

					} elseif ( 'checkbox' === $props['type'] ) {

						return sanitize_bool( $value );

					}

					return '';// TODO: return?
				},
			) );
		} );
	}
}
