<?php

namespace POSTSETTINGS;

class CustomText extends Setting {

	protected function before_set_schema() {
		parent::set_data_key_with_prefix();
		$this->prepare_content();
	}

	private function prepare_content() {

		if ( empty( $this->props['content'] ) ) {
			return;
		}

		$content_clean = array();

		foreach ( $this->props['content'] as $key => $value ) {
			if ( is_array( $value ) ) {
				$list       = $value;
				$list_clean = array();

				foreach ( $list as $li_value ) {
					if ( ! is_string( $li_value ) ) {
						continue;
					}

					$list_clean[] = $li_value;
				}

				$content_clean[] = array(
					'type'    => $key,
					'content' => \wp_json_encode( $list_clean ),
				);

				continue;
			}

			if ( ! is_string( $key ) || ! is_string( $value ) ) {
				continue;
			}

			$content_clean[] = array(
				'type'    => $key,
				'content' => $value,
			);
		}

		$this->props['content'] = $content_clean;
	}

	protected function set_defaults() {
		$this_defaults = array(
			'type'    => 'custom_text',
			'content' => '',
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			\wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'content' => array(
				'type'       => 'array_array_text',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			\wp_parse_args( $this_schema, $parent_schema );
	}
}
