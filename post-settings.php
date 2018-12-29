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
if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! defined( 'PLUGIN_VERSION' ) ) {
	define( 'PLUGIN_VERSION', '0.0.1' );
}
if ( ! defined( 'BUILD_DIR' ) ) {
	define( 'BUILD_DIR', plugins_url( 'build/', __FILE__ ) );
}
if ( ! defined( 'INC_DIR' ) ) {
	define( 'INC_DIR', plugin_dir_path( __FILE__ ) . 'inc/' );
}

require_once INC_DIR . '_test-back.php';
require_once INC_DIR . '_test-front.php';

// Utils.
require_once INC_DIR . 'utils/utils-meta.php';
require_once INC_DIR . 'utils/utils-methods.php';
require_once INC_DIR . 'utils/utils-sanitize.php';

// Classes.
require_once INC_DIR . 'classes/class-base.php';
require_once INC_DIR . 'classes/class-sidebar.php';
require_once INC_DIR . 'classes/class-tab.php';
require_once INC_DIR . 'classes/class-panel.php';
require_once INC_DIR . 'classes/class-setting.php';
require_once INC_DIR . 'classes/class-setting-checkbox.php';
require_once INC_DIR . 'classes/class-setting-radio.php';
require_once INC_DIR . 'classes/class-setting-select.php';
require_once INC_DIR . 'classes/class-setting-range.php';
require_once INC_DIR . 'classes/class-setting-text.php';
require_once INC_DIR . 'classes/class-setting-textarea.php';
require_once INC_DIR . 'classes/class-setting-color.php';
require_once INC_DIR . 'classes/class-setting-image.php';
require_once INC_DIR . 'classes/class-setting-customText.php';
require_once INC_DIR . 'classes/class-setting-dateTime.php';

// Core.
require_once INC_DIR . 'core/core-create_sidebar.php';
require_once INC_DIR . 'core/core-create_instances.php';

// Register.
require_once INC_DIR . 'register/register-create_sidebar.php';
require_once INC_DIR . 'register/register-public_utils.php';
require_once INC_DIR . 'register/register-enqueue.php';

require_once plugin_dir_path( __FILE__ ) . 'pro/pro.php';
