<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class Base
 */
abstract class Base {

	use CastSchema, ValidateConditions;

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
		$this->cast_props();

		$this->set_id_with_prefix();

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

	/**
	 * Assign default properties if not present in the given array and
	 * remove keys which are not present in $props_defaults.
	 */
	private function merge_defaults() {
		$this->props = shortcode_atts( $this->props_defaults, $this->props );
	}

	/**
	 * Cast the given properties to the required schema.
	 */
	private function cast_props() {
		$this->props = $this->cast_schema( $this->props, $this->props_schema );
	}

	/**
	 * Set the validity of the class checking if each prop fits the given conditions.
	 */
	private function validate_props() {
		$is_valid = $this->validate_conditions( $this->props, $this->props_schema );

		$this->props['valid'] = $is_valid;
	}

	private function set_id_with_prefix() {

		if ( empty( $this->props['id'] ) ) {
			return;
		}

		$this->props['id'] = $this->props['id_prefix'] . $this->props['id'];
	}

	public function get_id() {
		return $this->props['id'];
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
