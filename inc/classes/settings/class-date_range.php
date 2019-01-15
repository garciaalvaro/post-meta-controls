<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Class Base Setting DateRange
 */
class DateRange extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'date_range',
			'default_value' => '',
			'format'        => 'DD/MM/YYYY',
			'locale'        => 'en',
		);

		$parent_defaults = Setting::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'format' => array(
				'type'   => 'text',
				'for_js' => true,
			),
			'locale' => array(
				'type'   => 'id',
				'for_js' => true,
			),
		);

		$parent_schema = Setting::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}

	public function enqueue_locale() {

		$locale       = $this->props['locale'];
		$locale_array = get_date_locale();

		if ( false === in_array( $locale, $locale_array ) ) {
			return;
		}

		// Add the action to enqueue the locale script.
		add_action(
			'pmc_before_enqueue',
			function() use ( $locale ) {

				// Enqueue the selected locale script. This way we load each file
				// only if it is going to be used.
				wp_enqueue_script(
					PLUGIN_NAME . '-moment_locale-' . $locale,
					BUILD_DIR . 'moment-locale/' . $locale . '.js',
					array(),
					PLUGIN_VERSION,
					true // Enqueue in the footer.
				);
			}
		);
	}
}
