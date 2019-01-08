<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

abstract class Base {

	protected $props;
	protected $props_privates;
	protected $props_defaults;
	protected $props_schema;

	function __construct( $props = array() ) {

		$this->props = $props;

		// Remove keys that are meant to be assigned by the class.
		$this->set_privates();
		$this->unset_private_keys();

		// Defaults.
		$this->set_defaults();
		$this->merge_defaults();

		// Run functions before cast schema.
		if ( method_exists( $this, 'before_set_schema' ) ) {
			$this->before_set_schema();
		}

		// Schema.
		$this->set_schema();
		$this->cast_schema();
		$this->validate_props();
	}

	abstract protected function set_defaults();
	abstract protected function set_schema();

	protected function set_privates() {}

	private function unset_private_keys() {
		if ( is_null( $this->props_privates ) ) {
			return;
		}

		foreach ( $this->props_privates as $private ) {
			if ( isset( $this->props[ $private ] ) ) {
				unset( $this->props[ $private ] );
			}
		}
	}

	private function merge_defaults() {
		// Assign default elements if not present in $array and
		// remove keys which are not present in $defaults.
		$this->props = shortcode_atts( $this->props_defaults, $this->props );
	}

	private function cast_schema() {

		$this->props = cast_schema( $this->props, $this->props_schema );

	}

	private function validate_props() {
		foreach ( $this->props_schema as $key => $schema ) {

			if ( ! isset( $schema['conditions'] ) || false === $schema['conditions'] ) {
				continue;
			}

			$conditions = $schema['conditions'];

			if ( 'not_empty' === $conditions && empty( $this->props[ $key ] ) ) {
				$this->props['valid'] = false;
				return;
			} elseif ( is_bool( $conditions ) && false === $conditions ) {
				$this->props['valid'] = false;
				return;
			} elseif ( is_array( $conditions ) ) {
				foreach ( $conditions as $condition ) {
					if ( false === $condition ) {
						$this->props['valid'] = false;
						return;
					}
				}
			}
		}

		$this->props['valid'] = isset( $this->props['valid'] )
			? false
			: true;
	}

	public function is_valid() {
		return ! empty( $this->props['valid'] );
	}

	public function get_id() {
		return isset( $this->props['id'] ) ? $this->props['id'] : false;
	}

	public function get_post_type() {
		return $this->props['post_type'];
	}

	public function get_props_for_js() {

		$props_for_js = array();

		foreach ( $this->props as $key => $value ) {
			if (
				isset( $this->props_schema[ $key ]['for_js'] ) &&
				true === $this->props_schema[ $key ]['for_js']
			) {
				$props_for_js[ $key ] = $value;
			}
		}

		return $props_for_js;
	}
}
