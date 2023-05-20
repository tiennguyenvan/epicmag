To remove the "block-editor-block-list__layout" and "block-editor-inner-blocks" inner wrappers of a block that allows inner blocks, you can use the following steps:

Find the PHP file that registers the block you want to modify. This file is usually located in the "functions.php" file or a separate file in the "blocks" folder of your theme or plugin.

In that PHP file, find the function that registers the block. This function should be named "register_block_type" and it should contain an array of options for the block.

Within the options array, add the "render_callback" option and set it to a custom function that will render the block without the inner wrappers.

Define the custom function that will render the block. Within this function, you will need to retrieve the block's inner content using the "render_block()" function, and then output it without the inner wrappers.

Here is an example of how the options array for the block might look:

c
Copy code
register_block_type( 'my-blocks/my-block', array(
    'attributes' => array(
        // Add your block attributes here
    ),
    'render_callback' => 'my_block_render_callback',
) );
And here is an example of the custom function that will render the block without the inner wrappers:

php
Copy code
function my_block_render_callback( $attributes, $content ) {
    // Render the block's inner content without the inner wrappers
    $output = render_block( $content );
    $output = preg_replace( '/<div class="block-editor-block-list__layout">/', '', $output );
    $output = preg_replace( '/<\/div>\s*<\/div>/', '</div>', $output );
    
    // Add any additional markup or logic here
    
    return $output;
}
In this example, the "preg_replace()" functions are used to remove the "block-editor-block-list__layout" and "block-editor-inner-blocks" wrappers from the block's inner content. You may need to adjust the regular expressions used in these functions depending on the exact markup of your block.