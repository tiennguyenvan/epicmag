<?php

/**
 * ****************************************************************
 * At this time, we want stop apply this to not interfere with theme authors
 * For example, if author enabled the default palette and his users
 * are familiar with the tool, then they will get frustrated when
 * the tool is disabled via our plugin
 * 
 * But because the back-end code is heavily depending on the theme colors and layout
 * So we decided provide only those things instead of disabling toolbar or palette
 * ****************************************************************
 * 
 * https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/
 * Provide basic theme settings if the current theme has not
 * @var $theme_json WP_Theme_JSON_Data
 */
global $drag_block_update_theme_json;
$drag_block_update_theme_json = null;

// Read the contents of the JSON file
// Convert the JSON data to an array
define('DRAG_BLOCK_DEFAULT_THEME_JSON', json_decode(file_get_contents(drag_block_url('dragblock-default-theme.json')), true));
// var_dump(DRAG_BLOCK_DEFAULT_THEME_JSON);

add_filter('wp_theme_json_data_theme', 'drag_block_default_theme_json', 1);
function drag_block_default_theme_json($theme_json)
{
    global $drag_block_update_theme_json;
    if (!empty($drag_block_update_theme_json)) {
        return $theme_json->update_with($drag_block_update_theme_json);
    }

    $drag_block_update_theme_json = $theme_json->get_data();


    $drag_block_update_theme_json = drag_block_array_merge($drag_block_update_theme_json, DRAG_BLOCK_DEFAULT_THEME_JSON);


    // ------------------------------------------------------------------------------------------------
    // this is for showing default css of this plugin so user could change by themeself
    // however, we disabled it for now to simplify the working flow    
    // ------------------------------------------------------------------------------------------------
    if (DRAG_BLOCK_CUSTOM_DEFAULT_STYLE) {
        if (empty($drag_block_update_theme_json['styles']['css'])) {
            $drag_block_update_theme_json['styles']['css'] = '';
        }
        $drag_block_update_theme_json['styles']['css'] .= '/* START: CSS OF DRAGBLOCK */' . file_get_contents(drag_block_url('build/applications/front/style-index.css')) . '/* END: CSS OF DRAGBLOCK */';
    }

    return $theme_json->update_with($drag_block_update_theme_json);
}
