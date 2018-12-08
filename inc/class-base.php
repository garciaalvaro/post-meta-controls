<?php

namespace POSTSETTINGS;

abstract class Base {

	protected $props;
	private $props_default;
	private $props_schema;

	function __construct( $props = array() ) {

		// Set values.
		$this->props         = $props;
		$this->props_default = $this->get_props_default();
		$this->props_schema  = $this->get_props_schema();

		// Run functions before validating props.
		if ( method_exists( $this, 'pre_clean_props' ) ) {
			$this->pre_clean_props();
		}

		// Clean props.
		$this->unset_props_keys_private();
		$this->assign_props_defaults();
		$this->cast_props();

		// Run functions before validating props.
		if ( method_exists( $this, 'pre_props_validation' ) ) {
			$this->pre_props_validation();
		}
		$this->validate_props();

		// Run functions after validating props.
		if ( method_exists( $this, 'post_props_validation' ) ) {
			$this->post_props_validation();
		}
	}

	abstract protected function get_props_default();
	abstract protected function get_props_schema();

	private function unset_props_keys_private() {
		foreach ( $this->props_schema as $key => $schema ) {
			if ( true === $schema['private'] && isset( $this->props[ $key ] ) ) {
				unset( $this->props[ $key ] );
			}
		}
	}

	private function assign_props_defaults() {
		// Assign default elements if not present in $array and
		// remove keys which are not present in $defaults.
		$this->props = \shortcode_atts( $this->props_default, $this->props );
	}

	private function cast_props() {

		foreach ( $this->props as $key => $value ) {

			switch ( $this->props_schema[ $key ]['type'] ) {
				case 'id':
					$this->props[ $key ] = sanitize_id( $value );
					break;

				case 'text':
					$this->props[ $key ] = sanitize_text( $value );
					break;

				case 'integer':
					$this->props[ $key ] = sanitize_integer( $value );
					break;

				case 'bool':
					$this->props[ $key ] = sanitize_bool( $value );
					break;

				case 'array_string':
					$this->props[ $key ] = sanitize_array_string( $value );
					break;

				case 'array_array_string':
					$this->props[ $key ] = sanitize_array_array_string( $value );
					break;

				default:
					$this->props[ $key ] = '';
					break;
			}
		}
	}

	private function validate_props() {
		foreach ( $this->props_schema as $key => $schema ) {
			if (
				true === $schema['required'] &&
				! isset( $this->props[ $key ] )
			) {
				$this->props['valid'] = false;
				return;
			}

			if (
				is_array( $schema['can_be_empty'] ) &&
				$this->props[ $schema['can_be_empty']['condition_key'] ] ===
					$schema['can_be_empty']['condition_value'] &&
				empty( $this->props[ $key ] )
			) {
				$this->props['valid'] = false;
				return;
			}

			if (
				false === $schema['can_be_empty'] &&
				empty( $this->props[ $key ] )
			) {
				$this->props['valid'] = false;
				return;
			}
		}

		if ( ! isset( $this->props['valid'] ) ) {// TODO ensure
			$this->props['valid'] = true;
		}
	}

	protected function assign_prop_id() {

		if (
			! empty( $this->props['id'] ) ||
			! is_array( $this->props['path'] ) ||
			empty( $this->props['path'] ) ||
			! isset( $this->props['index'] )
		) {
			return;
		}

		$this->props['id'] =
			end( $this->props['path'] ) . '_' . $this->props['index'];
	}

	protected function add_js_filter() {

	// 	if ( false === $this->props['valid'] ) {
	// 		return false;
	// 	}

	// 	$props           = $this->props;
	// 	$props_post_type = $props['post_type'];

	// 	unset( $props['post_type'] );
	// 	unset( $props['valid'] );

	// 	\add_filter(
	// 		'ps_add_js_filters',
	// 		function( $js_filters, $post_type ) use ( $props, $props_post_type ) {

	// 			if ( $props_post_type !== $post_type ) {
	// 				return $js_filters;
	// 			}
	// 			$js_filters[] =
	// 				implode( '',
	// 					array(
	// 						'ps_af(',// wp.hooks.addFilter
	// 						'"ps_add_' . $props['class_type'] . '",',
	// 						'"' . $props['class_type'] . '",',
	// 						'(els) => {',
	// 						'return els.concat(' . \wp_json_encode( $props ) . ');',
	// 						'}',
	// 						');',
	// 					)
	// 				);

	// 			return $js_filters;
	// 		},
	// 		10,
	// 		2
	// 	);
	}

	public function is_valid() {
		return ! empty( $this->props['valid'] );
	}

	public function get_id() {
		return isset( $this->props['id'] ) ? $this->props['id'] : false;
	}

	public function get_props() {
		return $this->props;
	}
}
