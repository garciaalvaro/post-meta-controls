<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

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

		$locale = $this->props['locale'];
		$locale_array = array(
			'af',
			'ar-dz',
			'ar-kw',
			'ar-ly',
			'ar-ma',
			'ar-sa',
			'ar-tn',
			'ar',
			'az',
			'be',
			'bg',
			'bm',
			'bn',
			'bo',
			'br',
			'bs',
			'ca',
			'cs',
			'cv',
			'cy',
			'da',
			'de-at',
			'de-ch',
			'de',
			'dv',
			'el',
			'en-au',
			'en-ca',
			'en-gb',
			'en-ie',
			'en-il',
			'en-nz',
			'eo',
			'es-do',
			'es-us',
			'es',
			'et',
			'eu',
			'fa',
			'fi',
			'fo',
			'fr-ca',
			'fr-ch',
			'fr',
			'fy',
			'gd',
			'gl',
			'gom-latn',
			'gu',
			'he',
			'hi',
			'hr',
			'hu',
			'hy-am',
			'id',
			'is',
			'it',
			'ja',
			'jv',
			'ka',
			'kk',
			'km',
			'kn',
			'ko',
			'ku',
			'ky',
			'lb',
			'lo',
			'lt',
			'lv',
			'me',
			'mi',
			'mk',
			'ml',
			'mn',
			'mr',
			'ms-my',
			'ms',
			'mt',
			'my',
			'nb',
			'ne',
			'nl-be',
			'nl',
			'nn',
			'pa-in',
			'pl',
			'pt-br',
			'pt',
			'ro',
			'ru',
			'sd',
			'se',
			'si',
			'sk',
			'sl',
			'sq',
			'sr-cyrl',
			'sr',
			'ss',
			'sv',
			'sw',
			'ta',
			'te',
			'tet',
			'tg',
			'th',
			'tl-ph',
			'tlh',
			'tr',
			'tzl',
			'tzm-latn',
			'tzm',
			'ug-cn',
			'uk',
			'ur',
			'uz-latn',
			'uz',
			'vi',
			'x-pseudo',
			'yo',
			'zh-cn',
			'zh-hk',
			'zh-tw',
		);

		if ( false === in_array( $locale, $locale_array ) ) {
			return;
		}

		// Add the action to localize the data into the editor.
		add_action(
			'pmc_before_enqueue',
			function() use ( $locale ) {

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
