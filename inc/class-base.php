<?php

namespace POSTSETTINGS;

abstract class Base {

	protected $props;
	private $props_default;
	private $props_schema;
	private $props_for_js;

	function __construct( $props = array() ) {

		// Set values.
		$this->props         = $props;
		$this->props_default = $this->get_props_default();
		$this->props_schema  = $this->get_props_schema();
		$this->props_for_js  = $this->get_js_props();

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
	abstract protected function get_js_props();

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

				case 'float':
					$this->props[ $key ] = sanitize_float( $value );
					break;

				case 'integer':
					$this->props[ $key ] = sanitize_integer( $value );
					break;

				case 'boolean':
					$this->props[ $key ] = sanitize_boolean( $value );
					break;

				case 'array_integer':
					$this->props[ $key ] = sanitize_array_integer( $value );
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

			$required = $schema['required'];

			// If is required.
			if (
				false === validate_required( $required, $this->props )
			) {
				$this->props['valid'] = false;
				return;
			}

			if ( ! isset( $schema['conditions'] ) ) {
				continue;
			}

			$conditions = $schema['conditions'];

			// If has conditions assigned.
			if (
				false ===
					validate_conditions( $conditions, $key, $this->props )
			) {
				$this->props['valid'] = false;
				return;
			}
		}

		if ( ! isset( $this->props['valid'] ) ) {// TODO ensure
			$this->props['valid'] = true;
		}
	}

	// protected function assign_prop_id() {

	// 	if (
	// 		! empty( $this->props['id'] ) ||
	// 		! is_array( $this->props['path'] ) ||
	// 		empty( $this->props['path'] ) ||
	// 		! isset( $this->props['index'] )
	// 	) {
	// 		return;
	// 	}

	// 	$path = '';

	// 	foreach ( $this->props['path'] as $value ) {
	// 		$path .= $value . '_';
	// 	}

	// 	$this->props['id'] = $this->props['index'];

	// }

	public function is_valid() {
		return ! empty( $this->props['valid'] );
	}

	public function get_id() {
		return isset( $this->props['id'] ) ? $this->props['id'] : false;
	}

	public function get_props_for_js() {

		$filtered_props = $this->props;

		foreach ( $this->props as $key => $value ) {
			if ( ! in_array( $key, $this->props_for_js ) ) {
				unset( $filtered_props[ $key ] );
			}
		}

		return $filtered_props;
	}
}
