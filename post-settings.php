<?php
/**
 * Plugin Name: Post Settings
 * Plugin URI: #
 * Description: Panel of meta settings for Gutenberg editor.
 * Author: melonpan
 * Version: 0.0.1
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace POSTSETTINGS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'POSTSETTINGS_PLUGIN_VERSION' ) ) {
	define( 'POSTSETTINGS_PLUGIN_VERSION', '0.0.1' );
}
if ( ! defined( 'POSTSETTINGS_BUILD_DIR' ) ) {
	define( 'POSTSETTINGS_BUILD_DIR', plugins_url( 'build/', __FILE__ ) );
}
if ( ! defined( 'POSTSETTINGS_INC_DIR' ) ) {
	define( 'POSTSETTINGS_INC_DIR', plugin_dir_path( __FILE__ ) . 'inc/' );
}


require_once POSTSETTINGS_INC_DIR . 'utils.php';
require_once POSTSETTINGS_INC_DIR . 'enqueue.php';

require_once POSTSETTINGS_INC_DIR . 'class-base.php';
require_once POSTSETTINGS_INC_DIR . 'class-sidebar.php';
require_once POSTSETTINGS_INC_DIR . 'class-tab.php';
require_once POSTSETTINGS_INC_DIR . 'class-panel.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting-checkbox.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting-radio.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting-select.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting-range.php';
require_once POSTSETTINGS_INC_DIR . 'class-setting-text.php';
// require_once POSTSETTINGS_INC_DIR . 'class-setting-custom_component.php';

// require_once POSTSETTINGS_INC_DIR . 'register-get_children_elements.php';
// require_once POSTSETTINGS_INC_DIR . 'register-get_class_instances.php';
require_once POSTSETTINGS_INC_DIR . 'register-register_setting_meta.php';
require_once POSTSETTINGS_INC_DIR . 'register-add_metadata_exists_prop.php';
require_once POSTSETTINGS_INC_DIR . 'register-get_props.php';
require_once POSTSETTINGS_INC_DIR . 'register-generate_instances.php';
require_once POSTSETTINGS_INC_DIR . 'register-add_sidebar.php';

require_once POSTSETTINGS_INC_DIR . 'action.php';
// require_once POSTSETTINGS_INC_DIR . 'global_functions.php';
require_once POSTSETTINGS_INC_DIR . '_test.php';

require_once POSTSETTINGS_INC_DIR . 'test.php';
