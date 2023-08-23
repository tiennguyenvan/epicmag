<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/// all plugins are required
//  other plugins related to design are included in the demo json files
define('EPICMAG_REQUIRED_PLUGINS', array(    
    'dragblock' => '0.0.1',
    'sneeit-core' => '0.0.1',
));

if (is_admin()) {
	require_once 'plugins/plugins.php';
}

