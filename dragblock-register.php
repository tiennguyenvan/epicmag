<?php

/**
 * CUSTOM BLOCKS
 * ------------------
 */
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function drag_block_drag_block_block_init() {	
	if (!function_exists('register_block_type')) {
		return;
	}
	$path = plugin_dir_path(__FILE__) . 'build/blocks/';

	// folder name of the blocks in the src/blocks/ dir
	$blocks = array(
		// Basic,
		'wrapper',
		'link',
		'icon',
		'text',
		'image',

		// form,
		'form',
		'select',
		'option',
		'input',
		'textarea',
	);
	foreach ($blocks as $block) {
		register_block_type( $path . $block);
	}

	// Load available translations.	
	wp_set_script_translations( 'dragblock-editor-script-js', 'dragblock' );
}
add_action( 'init', 'drag_block_drag_block_block_init' );


/**
 * Register a custom block category so all blocks of DragBlockcould stay together
 * @param array $category the array of the current categories
 */
function drag_block_register_block_category( $categories ) {
	array_unshift($categories, array(
		'slug'  => 'dragblock-form',
		'title' => __( 'DragBlock Form', 'dragBlock-block' )
	));
    array_unshift($categories, array(
		'slug'  => 'dragblock-basic',
		'title' => __( 'DragBlock Basic', 'dragBlock-block' )
	));
	

	return $categories;
}

if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
	add_filter( 'block_categories_all', 'drag_block_register_block_category', 10, 2 );
} else {
	add_filter( 'block_categories', 'drag_block_register_block_category', 10, 2 );
}

