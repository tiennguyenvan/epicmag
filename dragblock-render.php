<?php

/**
 * Render Query / Functions
 */
global $dragBlockQueries;
global $dragBlockCurListQueryId;
global $dragBlockCurListQueryIdItem;
$dragBlockQueries = null;
$dragBlockCurListQueryId = null;
$dragBlockCurListQueryIdItem = null;

add_filter('render_block_data', 'drag_block_database_queries', 10, 2);
function drag_block_database_queries($parsed_block, $source_block)
{
    // process the blocks that have access to the database
    // if (empty($block['attrs']['dragBlockQueries'])) {
    //     return $parsed_block;
    // }


    global $dragBlockQueries;
    global $dragBlockCurListQueryId;
    global $dragBlockCurListQueryIdItem;


    // add default query
    if (empty($dragBlockQueries)) {
        global $wp_query;
        $dragBlockCurListQueryId = 'default';

        $dragBlockQueries[$dragBlockCurListQueryId] = array();
        if (property_exists($wp_query, 'posts') && is_array($wp_query->posts)) {
            foreach ($wp_query->posts as $post) {
                array_push($dragBlockQueries[$dragBlockCurListQueryId], $post->ID);
            }
        }
    }

    // process the custom queries
    if (!empty($parsed_block['attrs']['dragBlockQueries'])) {

        foreach ($parsed_block['attrs']['dragBlockQueries'] as $query) {
            if (!empty($query['disabled'])) {
                continue;
            }

            $slug = $query['slug'];
            $id = $query['id'];
            if (empty($query['params'])) {
                $query['params'] = array();
            }
            $params = $query['params'];

            // listing queries
            if (in_array($slug, array('WP_Query'))) {
                $dragBlockCurListQueryId = $id;
                $args = array(
                    'fields' => 'ids',
                );

                foreach ($query['params'] as $param) {
                    if (!empty($param['disabled']) || empty($param['value'])) {
                        continue;
                    }

                    // array attributes
                    $key = $param['slug'];
                    $val = $param['value'];

                    if (strpos($key, '__') !== false) {
                        $args[$key] = explode(',', $val);
                        continue;
                    }
                    $args[$key] = $val;
                }



                if ($slug == 'WP_Query') {
                    $dragBlockQueries[$dragBlockCurListQueryId] = new WP_Query($args);
                    $dragBlockQueries[$dragBlockCurListQueryId] = $dragBlockQueries[$dragBlockCurListQueryId]->posts;
                }
            }

            // other queries
            if ($slug == 'parse_item') {

                if (!empty($params['query_id'])) {
                    $dragBlockCurListQueryId = $params['query_id'];
                }
                if (!empty($params['item_index'])) {
                    $dragBlockCurListQueryIdItem = intval($params['item_index']);
                } else {
                    if ($dragBlockCurListQueryIdItem === null) {
                        $dragBlockCurListQueryIdItem = 0;
                    } else {
                        $dragBlockCurListQueryIdItem++;
                    }
                }
            }
        }
    }
    return $parsed_block;
}

/**
 * 
 */
add_filter('render_block', 'drag_block_render_block', 10, 2);
function drag_block_render_block($block_content, $parsed_block)
{
    // only process blocks from our plugins
    if (empty($parsed_block['attrs']['dragBlockClientId'])) {
        return $block_content;
    }

    // replace multilingual text contents
    $block_content = drag_block_render_text($block_content, $parsed_block);

    // render attributes
    $block_content = drag_block_render_attributes($block_content, $parsed_block);

    // render extra content of form
    $block_content = drag_block_render_form($block_content, $parsed_block);

    // check if there is a shortcode
    if (strpos($block_content, '[') === false || strpos($block_content, ']') === false) {
        return $block_content;
    }

    return do_shortcode($block_content);
}


function drag_block_render_attributes($block_content, $parsed_block)
{
    $posStartSpace = strpos($block_content, ' ');
    $posStartClose = strpos($block_content, '>');
    $posStart = $posStartSpace;

    if ($posStart === false) {
        $posStart = $posStartClose;
    } else if ($posStartClose !== false && $posStartClose < $posStart) {
        $posStart = $posStartClose;
    }

    if ($posStart === false) {
        return $block_content;
    }

    // inserting the attributes
    $attrString = '';

    if (!empty($parsed_block['attrs']['dragBlockClientId'])) {
        $attrString .= ' data-dragBlock-client-id="' . $parsed_block['attrs']['dragBlockClientId'] . '"';
    }
    if (!empty($parsed_block['attrs']['dragBlockAttrs'])) {

        $renderedAttrs = array();
        foreach ($parsed_block['attrs']['dragBlockAttrs'] as $attr) {
            // render enabled attr only
            if (
                !empty($attr['disabled']) ||
                !isset($attr['value']) ||
                empty($attr['slug']) ||

                // we don't re-render the same attribute
                in_array($attr['slug'], $renderedAttrs)
            ) {
                continue;
            }

            // render attributes that require for a specific language
            if (!empty($attr['locale']) && $attr['locale'] != DRAG_BLOCK_SITE_LOCALE) {
                continue;
            }



            $attrString .= $attr['slug'] . '="' . esc_attr($attr['value']) . '"';

            array_push($renderedAttrs, $attr['slug']);
        }
    }

    // insert
    if ($attrString) {
        $block_content = substr($block_content, 0, $posStart) . ' ' . $attrString . substr($block_content, $posStart);
    }


    return $block_content;
}

/**
 * replace multilingual text contents    
 */
function drag_block_render_text($block_content, $parsed_block)
{
    // this is don't have multilingual text content
    if (empty($parsed_block['attrs']['dragBlockText'])) {
        return $block_content;
    }

    $posClose = strrpos($block_content, '</');

    // there is no anchor to insert before
    if ($posClose === false) {
        return $block_content;
    }

    // replace multilingual text contents
    $dragBlockText = $parsed_block['attrs']['dragBlockText'];
    $textContent = '';

    $textEnUS = '';
    // search for the right text
    foreach ($dragBlockText as $text) {
        // we may need to add device here later
        if (empty($text['slug'] || !isset($text['value'])) || $text['value'] === '' || !empty($text['disabled'])) {
            continue;
        }

        if ($text['slug'] == DRAG_BLOCK_SITE_LOCALE) {
            $textContent = $text['value'];
            break;
        }

        if ($text['slug'] == 'en_US') {
            $textEnUS = $text['value'];
            continue;
        }
    }

    if ($textContent === '') {
        if ($textEnUS === '') {
            return $block_content;
        }
        $textContent = $textEnUS;
    }

    $block_content = substr($block_content, 0, $posClose) . $textContent . substr($block_content, $posClose);

    return $block_content;
}
