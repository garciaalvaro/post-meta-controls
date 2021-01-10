<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Trait DateLocales
 */
trait DateLocales
{
	/**
	 * Get an array of moment.js locale names.
	 */
	protected function get_date_locales()
	{
		return [
			"af",
			"ar-dz",
			"ar-kw",
			"ar-ly",
			"ar-ma",
			"ar-sa",
			"ar-tn",
			"ar",
			"az",
			"be",
			"bg",
			"bm",
			"bn",
			"bo",
			"br",
			"bs",
			"ca",
			"cs",
			"cv",
			"cy",
			"da",
			"de-at",
			"de-ch",
			"de",
			"dv",
			"el",
			"en-au",
			"en-ca",
			"en-gb",
			"en-ie",
			"en-il",
			"en-nz",
			"eo",
			"es-do",
			"es-us",
			"es",
			"et",
			"eu",
			"fa",
			"fi",
			"fo",
			"fr-ca",
			"fr-ch",
			"fr",
			"fy",
			"gd",
			"gl",
			"gom-latn",
			"gu",
			"he",
			"hi",
			"hr",
			"hu",
			"hy-am",
			"id",
			"is",
			"it",
			"ja",
			"jv",
			"ka",
			"kk",
			"km",
			"kn",
			"ko",
			"ku",
			"ky",
			"lb",
			"lo",
			"lt",
			"lv",
			"me",
			"mi",
			"mk",
			"ml",
			"mn",
			"mr",
			"ms-my",
			"ms",
			"mt",
			"my",
			"nb",
			"ne",
			"nl-be",
			"nl",
			"nn",
			"pa-in",
			"pl",
			"pt-br",
			"pt",
			"ro",
			"ru",
			"sd",
			"se",
			"si",
			"sk",
			"sl",
			"sq",
			"sr-cyrl",
			"sr",
			"ss",
			"sv",
			"sw",
			"ta",
			"te",
			"tet",
			"tg",
			"th",
			"tl-ph",
			"tlh",
			"tr",
			"tzl",
			"tzm-latn",
			"tzm",
			"ug-cn",
			"uk",
			"ur",
			"uz-latn",
			"uz",
			"vi",
			"x-pseudo",
			"yo",
			"zh-cn",
			"zh-hk",
			"zh-tw",
		];
	}
}
