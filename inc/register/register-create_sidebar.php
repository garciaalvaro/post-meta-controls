<?php

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'init', __NAMESPACE__ . '\create_sidebar' );
