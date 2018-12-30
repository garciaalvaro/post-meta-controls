<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

class Toolbar extends Setting {

	protected function before_set_schema() {
		parent::before_set_schema();
		$this->prepare_buttons();
	}

	private function prepare_buttons() {

		if ( empty( $this->props['buttons'] ) ) {
			return;
		}

		$buttons_clean = array();

		foreach ( $this->props['buttons'] as $button ) {
			if ( ! is_array( $button ) ) {
				continue;
			}

			$button_clean = array();

			if ( ! empty( $button['icon_svg'] ) && is_string( $button['icon_svg'] ) ) {
				$button_clean['icon_svg'] = sanitize_html_svg( $button['icon_svg'] );
			} elseif (
				! empty( $button['icon_dashicon'] ) &&
				is_string( $button['icon_dashicon'] )
			) {
				$button_clean['icon_dashicon'] = sanitize_id( $button['icon_dashicon'] );
			}

			if ( ! empty( $button['title'] ) && is_string( $button['title'] ) ) {
				$button_clean['title'] = sanitize_text( $button['title'] );
			}

			if ( ! empty( $button['value'] ) && is_string( $button['value'] ) ) {
				$button_clean['value'] = sanitize_id( $button['value'] );
			}

			if (
				! empty( $button_clean['value'] ) &&
				(
					! empty( $button_clean['icon_dashicon'] ) ||
					! empty( $button_clean['icon_svg'] )
				)
			) {
				$buttons_clean[] = $button_clean;
			}
		}

		$this->props['buttons'] = $buttons_clean;
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'toolbar',
			'default_value' => '',
			'buttons'       => array(),
			'multiple'      => false,
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'id_OR_array_id',
				'for_js' => true,
			),
			'buttons' => array(
				'type'       => 'array_array_string',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
			'multiple' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
