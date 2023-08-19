<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// add_filter('sneeit_required_plugins', function($plugins) {
//     $plugins[] = '*dragblock_0.0.1'; // this is required
//     $plugins[] = '*sneeit-core_1.0'; // this is required    
//     $plugins[] = '*test_0.0.1'; // this is required
//     // $plugins[] = '*breadcrumb-navxt_wp6.0.0'; // this is required
//     // $plugins[] = 'envato-market_2.0.1';
//     // $plugins[] = 'classic-editor';
//     return $plugins;
// });

// all plugins are required
// other plugins related to design are included in the demo json files
define('EPICMAG_REQUIRED_PLUGINS', array(    
    'dragblock' => '0.0.1',
    'sneeit-core' => '0.0.1',
));
if (is_admin()) {
	require_once 'plugins/plugins.php';
}

