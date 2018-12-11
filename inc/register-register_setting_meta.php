<?php

namespace POSTSETTINGS;

function register_setting_meta( $setting_instances = array() ) {

	\add_action( 'init', function() use ( $setting_instances ) {

		foreach ( $setting_instances as $setting_instance ) {

			$setting_instance->register_meta();

		}
	});
}
