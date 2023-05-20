<?php

/**
 * Plugin Name: DragBlock
 * Plugin URI: https://dragblock.com/
 * Requires at least: 5.6
 * Requires PHP: 5.6
 * Version: 0.0.1
 * Author: DragBlock.Com
 * Author URI: https://dragblock.com
 * License: GPL
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Description: Design stunning websites without any coding knowledge using DragBlock, the feature-rich Gutenberg plugin for lightning-fast site creation.
 * Text Domain: dragblock
 * Domain Path: /languages
 *
 * @package dragblock
 */


define(
	'DRAG_BLOCK_IS_LOCAL',
	!empty($_SERVER['OPENSSL_CONF']) && (strpos($_SERVER['OPENSSL_CONF'], 'C:/') == 0 ||
		strpos($_SERVER['OPENSSL_CONF'], 'D:/') == 0 ||
		strpos($_SERVER['OPENSSL_CONF'], 'E:/') == 0
	)
);
define('DRAG_BLOCK_VERSION', DRAG_BLOCK_IS_LOCAL ? time() : get_plugin_data(__FILE__)['Version']);
define('DRAG_BLOCK_SITE_LOCALE', get_locale());

// ------------------------------------------------------------------------------------------------
// this is for showing default css of this plugin so user could change by themeself
// however, we disabled it for now to simplify the working flow    
// ------------------------------------------------------------------------------------------------
define('DRAG_BLOCK_CUSTOM_DEFAULT_STYLE', false);

require_once 'dragblock-library.php';
require_once 'dragblock-form.php';
require_once 'dragblock-enqueue.php';
require_once 'dragblock-register.php';
require_once 'dragblock-fonts.php';
require_once 'dragblock-default-theme-json.php';
require_once 'dragblock-render.php';
require_once 'dragblock-shortcodes.php';
require_once 'dragblock-admin.php';
require_once 'dragblock-media.php';
