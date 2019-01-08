<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Color extends Setting {

	protected function before_set_schema() {
		Setting::before_set_schema();
		$this->prepare_palette();
	}

	private function prepare_palette() {

		if ( empty( $this->props['palette'] ) ) {
			return;
		}

		$palette_clean = array();

		foreach ( $this->props['palette'] as $key => $value ) {
			if ( ! is_string( $key ) || ! is_string( $value ) ) {
				continue;
			}

			$palette_clean[] = array(
				'name'  => $key,
				'color' => $value,
			);
		}

		$this->props['palette'] = $palette_clean;
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'color',
			'default_value' => '',
			'alpha'         => false,
			'palette'       => array(),
		);

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'id',
				'for_js' => true,
			),
			'alpha' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
			'palette' => array(
				'type'   => 'array_array_text',
				'for_js' => true,
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
