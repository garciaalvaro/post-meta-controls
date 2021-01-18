<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Trait PreparePalette
 */
trait PreparePalette
{
	protected function prepare_palette($palette = [])
	{
		if (empty($palette)) {
			return;
		}

		$palette = $this->sanitize_array($palette);

		$palette_clean = [];

		foreach ($palette as $key => $value) {
			if (!is_string($key) || !is_string($value)) {
				continue;
			}

			$palette_clean[] = [
				"name" => $key,
				"color" => $value,
			];
		}

		return $palette_clean;
	}
}
