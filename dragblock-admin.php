<?php

// register the plugin page
add_action('admin_menu', 'drag_block_admin_main_menu');
function drag_block_admin_main_menu()
{

	if ( !empty ( $GLOBALS['admin_page_hooks']['dragblock-admin-main-menu'] ) ) {
		return;
	}

	add_menu_page(
		__('DragBlock Welcome Page', 'dragblock'),
		__('DragBlock', 'dragblock'),
		'manage_options',
		'dragblock-admin-main-menu',
		'drag_block_admin_main_menu_page',
		plugins_url('dragblock/images/brands/favicon-16x16.png'),
		6
	);
}

// define the main menu page callback function
function drag_block_admin_main_menu_page()
{
	// display the content of the default plugin page
	echo '<h1>' . __('Welcome to DragBlock', 'dragblock') . '</h1>';
	echo '<p>' . __('This is the default admin page of the DragBlockplugin.', 'dragblock') . '</p>';
}

/**
 * 
 */
add_action( 'admin_enqueue_scripts', 'drag_block_admin_enqueue_scripts' );
function drag_block_admin_enqueue_scripts() {
    drag_block_enqueue('dragblock-app-admin', 'build/applications/admin/index.js', array('jquery'));
    drag_block_enqueue('dragblock-app-admin', 'build/applications/admin/style-index.css');
}
