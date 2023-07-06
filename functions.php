<?php

add_filter('sneeit_required_plugins', function($plugins) {
    $plugins[] = '*dragblock_0.0.1'; // this is required
    $plugins[] = '*sneeit-core_1.0'; // this is required
    // $plugins[] = 'envato-market_2.0.1';
    // $plugins[] = 'classic-editor';
    return $plugins;
});

if (is_admin() && !wp_doing_ajax()) {
	require_once 'plugins/plugins.php';
}

