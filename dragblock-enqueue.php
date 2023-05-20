<?php

/**
 * Documents
 * https://jasonyingling.me/enqueueing-scripts-and-styles-for-gutenberg-blocks/
 */

/**
 * Documents:
 * https://github.com/WordPress/gutenberg/issues/23223
 */
global $drag_block_save_css;
$drag_block_save_css = '';
global $drag_block_save_js;
$drag_block_save_js = '';
global $drag_block_theme_json;
global $drag_block_default_json;
global $drag_block_user_json;



/**
 * 
 */
function drag_block_enqueue_register($handle, $path, $dep = null)
{
    // enqueue script
    if (strpos($path, '.js')) {
        wp_register_script(
            $handle,
            drag_block_url($path),
            $dep,
            DRAG_BLOCK_VERSION,
            true
        );
    }
    // enqueue style
    else {
        wp_register_style(
            $handle,
            drag_block_url($path),
            $dep,
            DRAG_BLOCK_VERSION
        );
    }
}
/**
 * @param {string} $handle id of the script/style
 * @param {string} $path full path to the file, including the extension
 */
function drag_block_enqueue($handle, $path, $dep = null)
{
    drag_block_enqueue_register($handle, $path, $dep);
    // enqueue script
    if (strpos($path, '.js')) {
        wp_enqueue_script($handle);
    }
    // enqueue style
    else {
        wp_enqueue_style($handle);
    }
}





/**
 * Render custom css for any block that has inlineStyle attribute
 * $block = array(5) {
  ["blockName"]=> string(21) "dragblock/wrapper"
  ["attrs"]=> array(2) {}
  ["innerBlocks"]=>array(0) {}
  ["innerHTML"]=>string(113) ""
 */
// add_filter( 'render_block', 'drag_block_save_css', 10, 2 );
// function drag_block_save_css( $block_content, $block ) {    

//     if (empty($block['attrs']['dragBlockCSS'])) {        
//         return $block_content;
//     }    

//     global $drag_block_save_css;
//     $drag_block_save_css .= $block['attrs']['dragBlockCSS'];

// 	return $block_content;
// }


/**
 * Render custom JS for any block that has inlineScript attribute
 * $block = array(5) {  
 */
// add_filter( 'render_block', 'drag_block_save_js', 10, 2 );
// function drag_block_save_js( $block_content, $block ) {    

//     if (empty($block['attrs']['dragBlockJS'])) {        
//         return $block_content;
//     }    

//     global $drag_block_save_js;
//     $drag_block_save_js .= $block['attrs']['dragBlockJS'];

// 	return $block_content;
// }
/**
 * We have to use 'render_block' here because native core blocks like navigation-link
 * will have style attribute only in the rendering block
 */
add_filter('render_block', 'drag_block_assets_save', 10, 2);
function drag_block_assets_save($block_content, $block)
{
    if (!empty($block['attrs']['dragBlockCSS'])) {
        global $drag_block_save_css;
        $drag_block_save_css .= $block['attrs']['dragBlockCSS'];
    }
    if (!empty($block['attrs']['dragBlockJS'])) {
        global $drag_block_save_js;
        $drag_block_save_js .= $block['attrs']['dragBlockJS'];
    }

    return $block_content;
}



/**
 * Get json data from theme to replace vairables in the blocks scripts
 */
/**
 * Get theme default data
 */
add_filter('wp_theme_json_data_theme', 'drag_block_json_data_theme', 10);
function drag_block_json_data_theme($json)
{
    global $drag_block_theme_json;
    $drag_block_theme_json = $json->get_data();
    return $json;
}



/**
 * Get core default data
 */
add_filter('wp_theme_json_data_default', 'drag_block_json_data_default', 10);
function drag_block_json_data_default($json)
{
    global $drag_block_default_json;
    $drag_block_default_json = $json->get_data();
    return $json;
}

/**
 * Get core default data
 */
add_filter('wp_theme_json_data_user', 'drag_block_json_data_user', 10);
function drag_block_json_data_user($json)
{
    global $drag_block_user_json;
    $drag_block_user_json = $json->get_data();

    return $json;
}



// global $drag_block_wp_global_styles;
// $drag_block_wp_global_styles = new WP_Query();
// $drag_block_wp_global_styles = $drag_block_wp_global_styles->query(array(
//     'posts_per_page'      => 1,
//     'orderby'             => 'date',
//     'order'               => 'desc',
//     'post_type'           => 'wp_global_styles',
//     'post_status'         => 'published',
//     'ignore_sticky_posts' => true,
//     'no_found_rows'       => true,
//     'tax_query'           => array(
//         array(
//             'taxonomy' => 'wp_theme',
//             'field'    => 'name',
//             'terms'    => wp_get_theme()->get_stylesheet(),
//         ),
//     ),
// );
// if (count($drag_block_wp_global_styles) && property_exists($drag_block_wp_global_styles, 'post_content')) {
//     $drag_block_wp_global_styles = json_decode($drag_block_wp_global_styles[0]->post_content);
// } else {
//     $drag_block_wp_global_styles = null;
// }





/**
 * FRONT END
 * all scripts and styles for front-end display
 */
// add_action( 'wp_enqueue_scripts', 'drag_block_enqueue_front_end' );
add_action('enqueue_block_assets', 'drag_block_enqueue_front_end');
function drag_block_enqueue_front_end()
{

    // @fix: why this also be enqueued in the back-end editor (not the iframe)?
    drag_block_enqueue('dragblock-app-front', 'build/applications/front/index.js', array('jquery'));

    // if allow users to modify the default styles, then just need to load an empty css
    if (DRAG_BLOCK_CUSTOM_DEFAULT_STYLE) {
        drag_block_enqueue('dragblock-app-front', 'build/applications/front/index.css');
    } else {
        drag_block_enqueue('dragblock-app-front', 'build/applications/front/style-index.css');
    }



    global $drag_block_save_css;
    global $drag_block_save_js;

    // replace variables
    global $drag_block_theme_json;
    global $drag_block_default_json;
    global $drag_block_user_json;



    // var_dump('$drag_block_user_json', $drag_block_user_json['settings']['color']['palette']);
    // var_dump('$drag_block_theme_json', $drag_block_theme_json);
    // var_dump('UPDATE: $drag_block_theme_json', $drag_block_theme_json);
    // update color variables    
    if (
        !empty($drag_block_user_json['settings']['color']['palette']['theme'])
    ) {
        $drag_block_theme_json['settings']['color']['palette']['theme'] = $drag_block_user_json['settings']['color']['palette']['theme'];
    }
    if (
        !empty($drag_block_user_json['settings']['color']['palette']['custom'])
    ) {
        $drag_block_theme_json['settings']['color']['palette']['theme'] = array_merge($drag_block_theme_json['settings']['color']['palette']['theme'], $drag_block_user_json['settings']['color']['palette']['custom']);
    }

    if (!empty($drag_block_theme_json['settings']['color']['palette']['theme'])) {
        foreach ($drag_block_theme_json['settings']['color']['palette']['theme'] as $color) {
            // perfect match
            $drag_block_save_css = str_replace(
                '{c=' . $color['slug'] . '}',
                $color['color'],
                $drag_block_save_css
            );

            // without alpha match
            $drag_block_save_css = str_replace(
                '{c=' . $color['slug'] . '@}',
                substr($color['color'], 0, 7),
                $drag_block_save_css
            );
        }
    }

    if (!empty($drag_block_default_json['settings']['color']['palette']['default'])) {
        foreach ($drag_block_default_json['settings']['color']['palette']['default'] as $color) {
            // perfect match
            $drag_block_save_css = str_replace(
                '{c=' . $color['slug'] . '}',
                $color['color'],
                $drag_block_save_css
            );

            // without alpha match
            $drag_block_save_css = str_replace(
                '{c=' . $color['slug'] . '@}',
                substr($color['color'], 0, 7),
                $drag_block_save_css
            );
        }
    }


    /**
     * Back-end scripts already processed these
     */

    // update layout settings
    // if (!empty($drag_block_user_json['settings']['layout']['contentSize'])) {
    //     $drag_block_theme_json['settings']['layout']['contentSize'] = $drag_block_user_json['settings']['layout']['contentSize'];
    // }
    // if (!empty($drag_block_user_json['settings']['layout']['wideSize'])) {
    //     $drag_block_theme_json['settings']['layout']['wideSize'] = $drag_block_user_json['settings']['layout']['wideSize'];
    // }
    // if (!empty($drag_block_theme_json['settings']['layout']['contentSize'])) {
    //     $drag_block_save_css = str_replace('{s=content}', $drag_block_theme_json['settings']['layout']['contentSize'], $drag_block_save_css);
    // }
    // if (!empty($drag_block_theme_json['settings']['layout']['wideSize'])) {
    //     $drag_block_save_css = str_replace('{s=wide}', $drag_block_theme_json['settings']['layout']['wideSize'], $drag_block_save_css);
    // }



    if ($drag_block_save_css) {
        wp_add_inline_style('dragblock-app-front', $drag_block_save_css);
    }
    if ($drag_block_save_js) {
        wp_add_inline_script('dragblock-app-front', $drag_block_save_js, 'after');
    }
    if (strpos($drag_block_save_css, 'animation-name') !== false) {
        drag_block_enqueue('dragblock-app-animate', 'css/animate.min.css');
    }

    ////////////////////////////////
    // DragBlock Form Protection
    wp_add_inline_script('dragblock-app-front', 'var DRAG_BLOCK_FORM_NONCE_ACTION ="' . wp_create_nonce('dragblock/form-nonce-action') . '"', 'before');

    // this is submitted by a js bot (to fast in filling)
    // Start the session
    if (!session_id()) {
        session_start();
    }

    // Generate a unique ID
    $unique_id = uniqid();

    // Store the ID in the session
    $_SESSION[$unique_id] = time();


    wp_add_inline_script('dragblock-app-front', 'var DRAG_BLOCK_FORM_SESSION_TOKEN ="' . $unique_id . '"', 'before');



    // add body font-size setting to root element allow using 'rem' unit.
    /// ** temporarily pending **, we decided to use px as WordPress to set the font size
    // global $drag_block_wp_global_styles;
    // if (
    //     !empty($drag_block_wp_global_styles) &&
    //     property_exists($drag_block_wp_global_styles, 'styles') && 
    //     property_exists($drag_block_wp_global_styles->styles, 'typography') && 
    //     property_exists($drag_block_wp_global_styles->styles->typography, 'fontSize')
    // ) {
    //     $drag_block_wp_global_styles->styles->typography->fontSize = str_replace('var:preset|font-size|small', '13px', $drag_block_wp_global_styles->styles->typography->fontSize);
    //     $drag_block_wp_global_styles->styles->typography->fontSize = str_replace('var:preset|font-size|medium', '20px', $drag_block_wp_global_styles->styles->typography->fontSize);
    //     $drag_block_wp_global_styles->styles->typography->fontSize = str_replace('var:preset|font-size|large', '36px', $drag_block_wp_global_styles->styles->typography->fontSize);
    //     $drag_block_wp_global_styles->styles->typography->fontSize = str_replace('var:preset|font-size|x-large', '42px', $drag_block_wp_global_styles->styles->typography->fontSize);


    //     //  var:preset|font-size|small: 13px
    //     //  var:preset|font-size|medium: 20px
    //     //  var:preset|font-size|large: 36px
    //     //  var:preset|font-size|x-large: 42px

    //     wp_add_inline_style('dragblock-app-front', ':root{font-size:');
    // }


    // drag_block_enqueue('dragblock-app-front-import', 'build/applications/front/index.css');        
}


/**
 * IN IFRAME
 * all STYLES for modifying elements in editor iframe, including blocks
 */
add_action('after_setup_theme', 'drag_block_enqueue_editor_iframe', 100);
function drag_block_enqueue_editor_iframe()
{
    add_editor_style(drag_block_url('css/animate.min.css'));

    // if allow users to modify the default styles, then don't need to load this for editor
    // because the custom css will be loaded to the editor automatically via the style.css in theme.json
    if (!DRAG_BLOCK_CUSTOM_DEFAULT_STYLE) {
        add_editor_style(drag_block_url('build/applications/front/style-index.css'));
    }
}


/**
 * BACK END - EDITOR
 * all scripts and styles for modifying editor UI, ex: settings, controls, toolbars ... but the blocks
 */
add_action('enqueue_block_editor_assets', 'drag_block_enqueue_editor');
function drag_block_enqueue_editor()
{
    drag_block_enqueue('dragblock-app-back', 'build/applications/back/index.js', array('jquery'));
    drag_block_enqueue('dragblock-app-back', 'build/applications/back/style-index.css');
    drag_block_enqueue('dragblock-app-animate', 'css/animate.min.css');
    // drag_block_enqueue('dragblock-app-back-import', 'build/applications/back/index.css'); 

    wp_add_inline_script(
        'dragblock-app-back',
        '
    var DRAG_BLOCK_BLANK_DEMO_IMG="' . plugins_url('images/demo/blank.png', __FILE__) . '";    
    var DRAG_BLOCK_SITE_LOCALE="' . DRAG_BLOCK_SITE_LOCALE . '";
    ',
        'before'
    );
}
