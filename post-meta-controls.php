<?php
/**
 * Plugin Name: Post Meta Controls for Gutenberg
 * Plugin URI: https://wordpress.org/plugins/post-meta-controls/
 * Description: Controls to manage post meta data in the Gutenberg editor.
 * Author: melonpan
 * Version: 1.0.1
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( ! defined( __NAMESPACE__ . '\PLUGIN_VERSION' ) ) {
	define( __NAMESPACE__ . '\PLUGIN_VERSION', '1.0.1' );
}
if ( ! defined( __NAMESPACE__ . '\PLUGIN_NAME' ) ) {
	define( __NAMESPACE__ . '\PLUGIN_NAME', 'post-meta-controls' );
}
if ( ! defined( __NAMESPACE__ . '\BUILD_DIR' ) ) {
	define( __NAMESPACE__ . '\BUILD_DIR', plugins_url( 'build/', __FILE__ ) );
}
if ( ! defined( __NAMESPACE__ . '\INC_DIR' ) ) {
	define( __NAMESPACE__ . '\INC_DIR', plugin_dir_path( __FILE__ ) . 'inc/' );
}
if ( ! defined( __NAMESPACE__ . '\PLUGIN_DIR' ) ) {
	define( __NAMESPACE__ . '\PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

// DEV_start
require_once INC_DIR . 'test/test.php';

require_once INC_DIR . 'test/meta/buttons.php';
require_once INC_DIR . 'test/meta/checkbox_multiple.php';
require_once INC_DIR . 'test/meta/checkbox.php';
require_once INC_DIR . 'test/meta/color.php';
require_once INC_DIR . 'test/meta/custom_text.php';
require_once INC_DIR . 'test/meta/date_range.php';
require_once INC_DIR . 'test/meta/date_single.php';
require_once INC_DIR . 'test/meta/image_multiple.php';
require_once INC_DIR . 'test/meta/image.php';
require_once INC_DIR . 'test/meta/radio.php';
require_once INC_DIR . 'test/meta/range_float.php';
require_once INC_DIR . 'test/meta/range.php';
require_once INC_DIR . 'test/meta/select.php';
require_once INC_DIR . 'test/meta/text.php';
require_once INC_DIR . 'test/meta/textarea.php';
require_once INC_DIR . 'test/meta/_panel_1.php';
require_once INC_DIR . 'test/meta/_panel_2.php';
require_once INC_DIR . 'test/meta/_tab_1.php';
require_once INC_DIR . 'test/meta/_tab_2.php';
require_once INC_DIR . 'test/meta/_sidebar.php';
require_once INC_DIR . 'test/meta/_register.php';
// DEV_end

// Utils and Traits.
require_once INC_DIR . 'classes/utils/utils-methods_call.php';
require_once INC_DIR . 'traits/trait-sanitize.php';
require_once INC_DIR . 'traits/trait-cast_array.php';
require_once INC_DIR . 'traits/trait-cast_schema.php';
require_once INC_DIR . 'traits/trait-date_locales.php';
require_once INC_DIR . 'traits/trait-meta.php';
require_once INC_DIR . 'traits/trait-prepare_options.php';
require_once INC_DIR . 'traits/trait-prepare_palette.php';
require_once INC_DIR . 'traits/trait-validate_conditions.php';

// Classes.
require_once INC_DIR . 'classes/class-base.php';
require_once INC_DIR . 'classes/class-panel.php';
require_once INC_DIR . 'classes/class-setting.php';
require_once INC_DIR . 'classes/class-sidebar.php';
require_once INC_DIR . 'classes/class-tab.php';
require_once INC_DIR . 'classes/class-global_utils.php';

// Classes Settings.
require_once INC_DIR . 'classes/settings/class-buttons.php';
require_once INC_DIR . 'classes/settings/class-checkbox.php';
require_once INC_DIR . 'classes/settings/class-checkbox_multiple.php';
require_once INC_DIR . 'classes/settings/class-color.php';
require_once INC_DIR . 'classes/settings/class-custom_text.php';
require_once INC_DIR . 'classes/settings/class-date_range.php';
require_once INC_DIR . 'classes/settings/class-date_single.php';
require_once INC_DIR . 'classes/settings/class-image.php';
require_once INC_DIR . 'classes/settings/class-image_multiple.php';
require_once INC_DIR . 'classes/settings/class-radio.php';
require_once INC_DIR . 'classes/settings/class-range.php';
require_once INC_DIR . 'classes/settings/class-range_float.php';
require_once INC_DIR . 'classes/settings/class-select.php';
require_once INC_DIR . 'classes/settings/class-text.php';
require_once INC_DIR . 'classes/settings/class-textarea.php';

// Core.
require_once INC_DIR . 'core/core-create_sidebar.php';
require_once INC_DIR . 'core/core-create_instances.php';

// Register.
require_once INC_DIR . 'register/register-create_sidebar.php';
require_once INC_DIR . 'register/register-global-utils.php';
require_once INC_DIR . 'register/register-enqueue.php';

// PRO_start
require_once PLUGIN_DIR . 'pro/post-settings-pro.php';
// PRO_end
