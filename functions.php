<?php

add_filter('sneeit_required_plugins', function($plugins) {
    $plugins[] = '*dragblock'; // this is required
    $plugins[] = '*sneeit-core'; // this is required
    // $plugins[] = '*breadcrumb-navxt_wp6.0.0'; // this is required
    // $plugins[] = 'envato-market_2.0.1';
    // $plugins[] = 'classic-editor';
    return $plugins;
});

if (is_admin() && !wp_doing_ajax()) {
	require_once 'plugins/plugins.php';
}

