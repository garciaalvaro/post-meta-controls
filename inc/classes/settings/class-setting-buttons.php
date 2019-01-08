<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Buttons extends Setting {

	protected function before_set_schema() {
		Setting::before_set_schema();
		$this->prepare_options();
	}

	private function prepare_options() {

		if ( empty( $this->props['options'] ) ) {
			return;
		}

		$options_clean = array();

		foreach ( $this->props['options'] as $option ) {
			if ( ! is_array( $option ) ) {
				continue;
			}

			$option_clean = array();

			if ( ! empty( $option['icon_svg'] ) && is_string( $option['icon_svg'] ) ) {
				$option_clean['icon_svg'] = sanitize_html_svg( $option['icon_svg'] );
			} elseif (
				! empty( $option['icon_dashicon'] ) &&
				is_string( $option['icon_dashicon'] )
			) {
				$option_clean['icon_dashicon'] = sanitize_id( $option['icon_dashicon'] );
			}

			if ( ! empty( $option['title'] ) && is_string( $option['title'] ) ) {
				$option_clean['title'] = sanitize_text( $option['title'] );
			}

			if ( ! empty( $option['value'] ) && is_string( $option['value'] ) ) {
				$option_clean['value'] = sanitize_id( $option['value'] );
			}

			if (
				! empty( $option_clean['value'] ) &&
				(
					! empty( $option_clean['icon_dashicon'] ) ||
					! empty( $option_clean['icon_svg'] )
				)
			) {
				$options_clean[] = $option_clean;
			}
		}

		$this->props['options'] = $options_clean;
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'buttons',
			'default_value' => '',
			'allow_empty'   => false,
			'options'       => array(),
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
			'allow_empty' => array(
				'type'       => 'boolean',
				'for_js'     => true,
			),
			'options' => array(
				'type'       => 'array_array_string',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
