<?php

namespace POSTSETTINGS;

function get_props( $class_instances = array() ) {

	$props = array();

	foreach ( $class_instances as $class_instance ) {

		$props[] = $class_instance->get_props_for_js();

	}

	return $props;
}
