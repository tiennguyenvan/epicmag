<?php




global $dragBlockQueries;
global $dragBlockCurListQueryId;
global $dragBlockCurListQueryIdItem;
$dragBlockQueries = null;
$dragBlockCurListQueryId = null;
$dragBlockCurListQueryIdItem = null;

function drag_block_get_current_list_query_id()
{
    global $dragBlockQueries;
    global $dragBlockCurListQueryId;
    global $dragBlockCurListQueryIdItem;

    $item_id = null;

    if (
        $dragBlockCurListQueryId !== null &&
        $dragBlockCurListQueryIdItem !== null &&
        !empty($dragBlockQueries) &&
        !empty($dragBlockQueries[$dragBlockCurListQueryId]) &&
        !empty($dragBlockQueries[$dragBlockCurListQueryId][$dragBlockCurListQueryIdItem])
    ) {
        $item_id = $dragBlockQueries[$dragBlockCurListQueryId][$dragBlockCurListQueryIdItem];
    }

    return $item_id;
}

add_shortcode('dragblock.post.snippet', 'drag_block_shortcode_post_snippet');
function drag_block_shortcode_post_snippet($attrs)
{

    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }

    // Get the post excerpt if it exists, or the first paragraph of the post content
    if (has_excerpt($post_id)) {
        $snippet = get_the_excerpt($post_id);
    } else {
        $content = get_the_content(null, false, $post_id);
        $snippet = wp_trim_words($content, 55, '...');
    }

    return $snippet;
}

add_shortcode('dragblock.post.title', 'drag_block_shortcode_post_title');
function drag_block_shortcode_post_title($attrs)
{

    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }
    return get_the_title($post_id);
}

add_shortcode('dragblock.post.link', 'drag_block_shortcode_post_link');
function drag_block_shortcode_post_link($attrs)
{

    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }
    return get_the_permalink($post_id);
}

add_shortcode('dragblock.post.thumbnail.src', 'drag_block_shortcode_post_thumbnail_src');
function drag_block_shortcode_post_thumbnail_src()
{
    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }

    // Step 1: Check if post has a featured image
    if (has_post_thumbnail($post_id)) {
        $image_url = get_the_post_thumbnail_url($post_id, 'full');
        return $image_url;
    }

    // Step 2: Check if post has an image in the content
    $content = get_post_field('post_content', $post_id);
    $doc = new DOMDocument();
    @$doc->loadHTML($content);
    $img_tags = $doc->getElementsByTagName('img');
    if (count($img_tags) > 0) {
        $image_url = $img_tags[0]->getAttribute('src');
        return $image_url;
    }

    // Step 3: Check if post has any embedded video
    $pattern = '/<iframe.*?src="(https?:\/\/www\.youtube\.com\/embed\/([\w-]+))".*?><\/iframe>/i';
    preg_match($pattern, $content, $matches);
    if (count($matches) > 0) {
        $video_id = $matches[2];
        $image_url = 'https://img.youtube.com/vi/' . $video_id . '/hqdefault.jpg';
        return $image_url;
    }

    // Step 4: Return placeholder image
    // No thumbnail found, return default placeholder image
    $images_dir = array(
        'AI', 'cypto', 'cuisine', 'decor', 'travel'
    );
    // $images = glob($images_dir . '*.jpg'); // assuming images are in jpg format
    $images = array();
    foreach ($images_dir as $dir) {
        for ($i = 1; $i <= 10; $i++) {
            array_push($images, $dir . '/' . substr('00' . $i, 0, 3));
        }
    }

    $rand_index = array_rand($images);
    $image_url = plugins_url('images/demo/' . $images[$rand_index], __FILE__);
    return $image_url;
}

add_shortcode('dragblock.post.date', 'drag_block_shortcode_post_date');
function drag_block_shortcode_post_date($attrs)
{
    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }


    // Get the post date
    $post_date = get_post_field('post_date', $post_id);

    // Get the date format from site settings
    $date_format = get_option('date_format');

    // Change the date format
    $formatted_date = date_i18n($date_format, strtotime($post_date));

    // Output the formatted date
    return $formatted_date;
}

add_shortcode('dragblock.post.author.link', 'drag_block_shortcode_post_author_link');
function drag_block_shortcode_post_author_link($attrs)
{
    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }
    // Get the author ID of the post
    $author_id = get_post_field('post_author', $post_id);

    // Get the author link
    $author_link = get_author_posts_url($author_id);

    // Output the author link
    return esc_url($author_link);
}

add_shortcode('dragblock.post.author.name', 'drag_block_shortcode_post_author_name');
function drag_block_shortcode_post_author_name($attrs)
{
    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }
    // Get the author ID of the post
    $author_id = get_post_field('post_author', $post_id);

    // Get the author name
    $author_name = get_the_author_meta('display_name', $author_id);

    // Output the author name
    return $author_name;
}

add_shortcode('dragblock.post.author.avatar.src', 'drag_block_shortcode_post_author_avatar_src');
function drag_block_shortcode_post_author_avatar_src($attrs)
{
    $post_id = drag_block_get_current_list_query_id();

    if ($post_id === null) {
        return '';
    }
    // Get the author ID of the post
    $author_id = get_post_field('post_author', $post_id);

    // Get the author avatar source
    $avatar_src = get_avatar_url($author_id);

    // Output the author avatar
    return esc_url($avatar_src);
}


add_shortcode('dragblock.query', 'drag_block_shortcode_query');
function drag_block_shortcode_query($attrs)
{
    global $dragBlockQueries;
    global $dragBlockCurListQueryId;
    global $dragBlockCurListQueryIdItem;



    if (empty($dragBlockQueries)) {


        global $wp_query;
        $dragBlockCurListQueryId = 'default';

        $dragBlockQueries[$dragBlockCurListQueryId] = array();
        foreach ($wp_query->posts as $post) {
            array_push($dragBlockQueries[$dragBlockCurListQueryId], $post->ID);
        }
    }
    $slug = $attrs['the_query_slug'];
    $id = $attrs['the_query_id'];
    unset($attrs['the_query_slug']);
    unset($attrs['the_query_id']);


    // listing queries
    if (in_array($slug, array('WP_Query'))) {
        $dragBlockCurListQueryId = $id;
        $args = array(
            'fields' => 'ids',
        );

        foreach ($attrs as $key => $val) {
            // array attributes
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
        if (!empty($attrs['query_id'])) {
            $dragBlockCurListQueryId = $attrs['query_id'];
        }
        if (!empty($attrs['item_index'])) {
            $dragBlockCurListQueryIdItem = intval($attrs['item_index']);
        } else {
            if ($dragBlockCurListQueryIdItem === null) {
                $dragBlockCurListQueryIdItem = 0;
            } else {
                $dragBlockCurListQueryIdItem++;
            }
        }
    }


    return '';
}
