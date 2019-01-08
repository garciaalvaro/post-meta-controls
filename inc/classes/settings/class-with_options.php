<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

abstract class SettingWithOptions extends Setting {

	protected function prepare_options() {

		if ( empty( $this->props['options'] ) ) {
			return;
		}

		$options_clean = array();

		foreach ( $this->props['options'] as $key => $value ) {
			if (
				( ! is_string( $key ) && ! is_int( $key ) ) ||
				( ! is_string( $value ) && ! is_int( $value ) )
			) {
				continue;
			}

			$options_clean[] = array(
				'value' => sanitize_id( $key ),
				'label' => sanitize_text( $value ),
			);
		}

		$this->props['options'] = $options_clean;
	}
}
