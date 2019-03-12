<?php

namespace POSTMETACONTROLS;

function test_meta( $sidebars ) {

	$sidebars[] = test_meta_get_sidebar();

	return $sidebars;

}

add_filter( 'pmc_create_sidebar', __NAMESPACE__ . '\test_meta' );
