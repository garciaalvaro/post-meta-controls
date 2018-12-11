<?php

namespace POSTSETTINGS;

function add_metadata_exists_prop( $setting_instances = array() ) {

	foreach ( $setting_instances as $setting_instance ) {

		$setting_instance->add_metadata_exists_prop();

	}
}
