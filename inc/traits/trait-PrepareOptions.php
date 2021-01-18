<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Trait PrepareOptions
 */
trait PrepareOptions
{
	/**
	 * Prepare the array of options.
	 */
	protected function prepare_options($options = [])
	{
		$options = $this->sanitize_array($options);

		$options_clean = [];

		foreach ($options as $key => $value) {
			if (
				(!is_string($key) && !is_int($key)) ||
				(!is_string($value) && !is_int($value))
			) {
				continue;
			}

			$options_clean[] = [
				"value" => $this->sanitize_id($key),
				"label" => $this->sanitize_text($value),
			];
		}

		return $options_clean;
	}
}
