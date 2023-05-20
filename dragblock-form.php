<?php

// you are not allowed to modify this definition, not longer than 20 chars
define('DRAG_BLOCK_FORM_ENTRY', sanitize_key('dragBlockFormMsg')); // 19 chars

global $dragBlockFormMessageError;
$dragBlockFormMessageError = array();

/**
 * 
 */
function drag_block_render_form($block_content, $parsed_block)
{
	// this is a standard alone form, it does not need DragBlock form actions
	if (
		'dragblock/form' != $parsed_block['blockName'] ||
		strpos($block_content, '[dragblock.form.action]') === false
	) {
		return $block_content;
	}




	// only forms that selected to be processed by DragBlock will have the nonce
	$hasAction = false;
	if ($parsed_block['attrs']['dragBlockAttrs']) {
		foreach ($parsed_block['attrs']['dragBlockAttrs'] as $attr) {
			if ($attr['slug'] == 'action') {
				if (trim($attr['value']) === '[dragblock.form.action]') {
					$hasAction = true;
				}
				break;
			}
		}
	}

	// we process only the form that is intentionally selected with dragblock.form.action
	if (!$hasAction) {
		return $block_content;
	}

	// fill the form id
	$formClientId = '';

	foreach ($parsed_block['attrs']['dragBlockAttrs'] as $attr) {
		if ($attr['slug'] === 'name') {
			if ($attr['value']) {
				$formClientId = $attr['value'];
			}
			break;
		}
	}

	if (!$formClientId && $parsed_block['attrs']['dragBlockClientId']) {
		$formClientId = $parsed_block['attrs']['dragBlockClientId'];
	}



	// insert extra inputs to build the security for the form
	$postEndForm = strrpos($block_content, '</form>');
	if ($postEndForm !== false) {
		$extraInput = '';
		// allow us to know which is the form we are working with
		if ($formClientId) {
			// longer than the rerquirement of register_taxonomy
			if (strlen($formClientId) > 32) {
				$formClientId = substr($formClientId, 0, 32);
			}

			// always sanitize keys
			$formClientId = sanitize_key($formClientId);

			$extraInput .= '<input type="hidden" name="dragblock/form-client-id" value="' . $formClientId . '"/>';
		}

		// this is to make sure we are working with a from from out plugin
		// at this time, we use JS to field this field to prevent bot to fill the form
		// $extraInput .= wp_nonce_field('dragblock/form-nonce-action', 'dragblock/form-nonce-field', true, false);

		// we use this input to trap bots to fill the input
		// we hide this using our front-end css
		$extraInput .= '<input type="text" name="dragblock/form-title" value="">';
		$block_content = substr($block_content, 0, $postEndForm) . ' ' . $extraInput . substr($block_content, $postEndForm);
	}

	// adjust form classes depending on the submission status
	global $dragBlockFormMessageError;

	// - alter class name
	// class="wp-block-dragblock-form
	$classAnchor = 'class="wp-block-dragblock-form';
	$posClassStart = strpos($block_content, $classAnchor);
	if ($posClassStart === false) {
		$classAnchor = 'class=\'wp-block-dragblock-form';
		$posClassStart = strpos($block_content, $classAnchor);
	}

	if ($posClassStart !== false && isset($dragBlockFormMessageError[$formClientId])) {
		$posClassStart += strlen($classAnchor);
		if ($dragBlockFormMessageError[$formClientId] === false) {
			$block_content = substr($block_content, 0, $posClassStart) . ' dragblock-form-success' . substr($block_content, $posClassStart);
		} else {
			$block_content = substr($block_content, 0, $posClassStart) . ' dragblock-form-error' . substr($block_content, $posClassStart);
		}
	}

	// - fill the form error message
	$block_content = str_replace(
		'[dragblock.form.message.error]',
		!empty($dragBlockFormMessageError[$formClientId]) ? $dragBlockFormMessageError[$formClientId] : '',
		$block_content
	);

	// - empty the dragBlock action
	$block_content = str_replace('[dragblock.form.action]', '', $block_content);

	return $block_content;
}


// add_action('wp_loaded', 'drag_block_form_submission', 1);
add_action('init', 'drag_block_form_submission', 10);
function drag_block_form_submission()
{
	$dragBlockFormData = isset($_POST['dragblock/form-nonce-field']) ? $_POST : $_GET;
	// var_dump('$dragBlockFormData', $dragBlockFormData);

	// verify if this submit is for out plugin action processor
	if (
		!isset($dragBlockFormData['dragblock/form-nonce-field']) ||
		!wp_verify_nonce($dragBlockFormData['dragblock/form-nonce-field'], 'dragblock/form-nonce-action')
	) {
		return;
	}

	// submitted successfully => form security check
	// - prevent multiple submissions


	// - prevent bots
	if (
		// this is submited from a remote source
		!isset($dragBlockFormData['dragblock/form-title']) ||

		// this is submitted by a auto fill bot
		!empty($dragBlockFormData['dragblock/form-title']) ||

		// this is submitted from a non-js bot
		empty($dragBlockFormData['dragblock/form-session-token'])
	) {

		return;
	}

	// this is submitted by a js bot (to fast in filling)
	// Start the session
    if ( ! session_id() ) {
        session_start();
    }

    // Get the session variable
	$unique_id = $dragBlockFormData['dragblock/form-session-token'];
	if (empty($_SESSION[$unique_id])) {
		return;
	}
    $createdFormTime = $_SESSION[$unique_id];

	// $createdFormTime = intval($_SESSION[$unique_id]);
	if (!$createdFormTime || time() - $createdFormTime < 1) {

		return;
	}

	// init form

	$formClientId = '';
	if (isset($dragBlockFormData['dragblock/form-client-id'])) {
		$formClientId = $dragBlockFormData['dragblock/form-client-id'];
	} else {
		$formClientId = 'dragblock-form-unorganized';
	}

	// clean up form
	unset($dragBlockFormData['dragblock/form-client-id']);
	unset($dragBlockFormData['dragblock/form-nonce-field']);
	unset($dragBlockFormData['dragblock/form-session-token']);
	unset($dragBlockFormData['dragblock/form-title']);
	unset($dragBlockFormData['submit']);


	// prepare content
	global $dragBlockFormMessageError;
	$dragBlockFormMessageError[$formClientId] = false; // notify that the summission is successful at default

	// - check for duplicate submission
	$transientHash = get_transient('dragblock/form-transient-' . $formClientId);
	$newTransientHash = sha1(http_build_query($dragBlockFormData));
	if ($transientHash === $newTransientHash) {
		set_transient('dragblock/form-transient-' . $formClientId, $newTransientHash, 3600);
		$dragBlockFormMessageError[$formClientId] = __('Duplicate submission', 'dragblock');
		return;
	}
	set_transient('dragblock/form-transient-' . $formClientId, $newTransientHash, 3600);






	/*
	// because we cannot create taxonomies successfully so
	// temporarily disable at this time to simplify the whole process
	// create custom taxonomy from form client id here
	$term_slug = null;
	if (!taxonomy_exists($formClientId)) {
		$label = ucwords(str_replace('-', ' ', sanitize_title($formClientId)));

		$term_slug = register_taxonomy($formClientId, array('dragblock-form-entries'), array(
			'labels' => array(
				'name' => $label,
				'singular_name' => $label,
				'menu_name' => $label,
			),
			'public' => true,
			'show_ui' => true,
			'show_admin_column' => true,
			'show_in_menu' => true,
			'show_in_nav_menus' => true,
			'query_var' => true,
			'rewrite' => array(
				'slug' => $formClientId,
				'with_front' => false,
			),
		));
		var_dump('Create term', $term_slug->name, get_term_by('slug', $term_slug->name));
	} else {
		var_dump('Term existed');
		$term_slug = $formClientId;
	}
	if ($term_slug === null || is_wp_error($term_slug) || !property_exists($term_slug, 'name')) {
		// update message error for the form
		$dragBlockFormMessageError[$formClientId] = $term_slug->get_error_message();

		return;
	} else {
		$term_slug = $term_slug->name;
	}
	*/


	// create new custom post here	
	$post_id = wp_insert_post(array(
		'post_content'  => '',
		'post_status'   => 'publish',
		'post_type'     => DRAG_BLOCK_FORM_ENTRY
	));

	if (is_wp_error($post_id)) {
		$error_message = $post_id->get_error_message();
		// update message error for the form
		$dragBlockFormMessageError[$formClientId] = $error_message;

		return;
	}
	// - create the form entry content and metadata
	$content = '';
	$title = ucwords(str_replace('-', ' ', sanitize_title($formClientId))) . '): #' . $post_id;
	$keys = array();
	foreach ($dragBlockFormData as $key => $value) {
		if ('_wp_http_referer' !== $key) {
			$content .= '<p><strong>' . $key . ':</strong> ' . $value . '</p>';
		}
		array_push($keys, $key);

		// Add custom fields to the post
		// remeber using -- to distinguish between custom fields and system fields
		update_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '--' . $key, $value);
	}
	// - save key list so we can access them if needed
	// keys is a system field so use only one '-'
	update_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '-keys', $keys);

	wp_update_post(array(
		'ID' => $post_id,
		'post_title' => $title,
		'post_content' => $content
	));


	/*
	// because we cannot create taxonomies successfully so
	// temporarily disable at this time to simplify the whole process
	// - Set the TAXNOMY	
	// -- Get the term object for the newly registered taxonomy
	$term = get_term_by('slug', 'my-custom-taxonomy', $term_slug);
	var_dump('$term', $term, $post_id, $term_slug);
	if (false === $term || !is_object($term) || !property_exists($term, 'term_id')) {
		$dragBlockFormMessageError[$formClientId] = __('Can not create the form entry taxonomy', 'dragblock');
		return;
	}
	// -- Get the term ID
	wp_set_post_terms($post_id, array($term->term_id));
	*/

	// send email here
	// usually fail on localhost
	////////////////////////////////////////////////////////////////
	// - Not Send email on localhost
	// Set email variables
	$to = get_option('admin_email');
	$headers = array('Content-Type: text/html; charset=UTF-8');
	$subject = get_bloginfo('name') . ' - DragBlock Form – ' . $title;

	if (DRAG_BLOCK_IS_LOCAL) {
		return;
	}

	// - Email failed to send
	// - At this time, we don't notify the user but to show to admin that the email is failed
	if (!wp_mail($to, $subject, $content, $headers)) {
		// $dragBlockFormMessageError[$formClientId] = __('It was failed for sending email to the site owner.', 'dragblock');
		update_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '-failed-email', time());
		return;
	}

	update_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '-failed-email', 'PASSED');

	// submitted successfully => form security update
}


// register the dragBlock form entry type
add_action('init', 'drag_block_register_custom_post_type');
function drag_block_register_custom_post_type()
{
	$labels = array(
		'name'                  => __('DragBlock Form Entries', 'dragblock'),
		'singular_name'         => __('DragBlock Form Entry', 'dragblock'),
		'menu_name'             => __('Block Form Entry', 'dragblock'),
		'name_admin_bar'        => __('Block Form Entry', 'dragblock'),
		'add_new'               => __('Add New', 'dragblock'),
		'add_new_item'          => __('Add New DragBlock Form Entry', 'dragblock'),
		'new_item'              => __('New DragBlock Form Entry', 'dragblock'),
		'edit_item'             => __('Edit DragBlock Form Entry', 'dragblock'),
		'view_item'             => __('View DragBlock Form Entry', 'dragblock'),
		'all_items'             => __('All DragBlock Forms', 'dragblock'),
		'search_items'          => __('Search DragBlock Forms', 'dragblock'),
		'parent_item_colon'     => __('Parent DragBlock Forms:', 'dragblock'),
		'not_found'             => __('No DragBlock Forms found.', 'dragblock'),
		'not_found_in_trash'    => __('No DragBlock Forms found in Trash.', 'dragblock'),
		'archives'              => __('DragBlock Form Archives', 'dragblock'),
		'attributes'            => __('DragBlock Form Attributes', 'dragblock'),
		'insert_into_item'      => __('Insert into DragBlock Form', 'dragblock'),
		'uploaded_to_this_item' => __('Uploaded to this DragBlock Form', 'dragblock'),
		'featured_image'        => __('Featured Image', 'dragblock'),
		'set_featured_image'    => __('Set featured image', 'dragblock'),
		'remove_featured_image' => __('Remove featured image', 'dragblock'),
		'use_featured_image'    => __('Use as featured image', 'dragblock'),
		'filter_items_list'     => __('Filter DragBlock Forms list', 'dragblock'),
		'items_list_navigation' => __('DragBlock Forms list navigation', 'dragblock'),
		'items_list'            => __('DragBlock Forms list', 'dragblock'),
	);

	$args = array(
		'labels'              => $labels,
		'public'              => true,
		'publicly_queryable'  => true,
		'show_ui'             => true,
		'show_in_menu'        => false,
		'query_var'           => true,
		'rewrite'             => array('slug' => DRAG_BLOCK_FORM_ENTRY),
		'capability_type' => 'no_add_new', // set custom capability type
		'capabilities' => array(
			'edit_post' => 'edit_' . DRAG_BLOCK_FORM_ENTRY,
			'read_post' => 'read_' . DRAG_BLOCK_FORM_ENTRY,
			'delete_post' => 'delete_' . DRAG_BLOCK_FORM_ENTRY,
			'edit_posts' => 'edit_' . DRAG_BLOCK_FORM_ENTRY . 's',
			'edit_others_posts' => 'edit_others_' . DRAG_BLOCK_FORM_ENTRY . 's',
			'publish_posts' => 'publish_' . DRAG_BLOCK_FORM_ENTRY . 's',
			'read_private_posts' => 'read_private_' . DRAG_BLOCK_FORM_ENTRY . 's',
			'create_posts' => false, // prevent creating new items
		),
		'has_archive'         => true,
		'hierarchical'        => false,
		'menu_position'       => 1,
		'supports'            => array('title', 'editor', 'custom-fields'),
		'menu_icon'           => 'dashicons-email',
		'show_in_rest'        => true,
		'exclude_from_search' => true,
	);

	register_post_type(DRAG_BLOCK_FORM_ENTRY, $args);
}


/**
 * Add submenu to DragBlock Main Menu
 */
add_action('admin_menu', 'drag_block_form_admin_menu');
function drag_block_form_admin_menu()
{
	add_submenu_page(
		'dragblock-admin-main-menu',
		__('DragBlock - Form Entries', 'dragblock'),
		__('Form Entries', 'dragblock'),
		'manage_options',
		'edit.php?post_type=' . DRAG_BLOCK_FORM_ENTRY,
		''
	);
}


/**
 * customize the table's columns of our custom post type
 */
add_filter('manage_' . DRAG_BLOCK_FORM_ENTRY . '_posts_columns', 'drag_block_manage_form_entry_posts_columns');
function drag_block_manage_form_entry_posts_columns($columns)
{
	unset($columns['date']);
	$columns['content'] = __('Content', 'dragblock');
	$columns['referrer'] = __('Referrer', 'dragblock');
	$columns['email'] = __('Emailed', 'dragblock');
	$columns['date'] = __('Date', 'dragblock');
	return $columns;
}


add_action('manage_' . DRAG_BLOCK_FORM_ENTRY . '_posts_custom_column', 'drag_block_manage_form_entry_posts_custom_column', 10, 2);
function drag_block_manage_form_entry_posts_custom_column($column, $post_id)
{
	if ($column == 'content') {
		echo strip_tags(get_the_content($post_id), ['strong', 'p']);
	} else if ($column == 'referrer') {
		$referrer = get_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '--' . '_wp_http_referer', true);
		echo '<a target="_blank" href="' . $referrer . '">' . $referrer . '</a>';
	} else if ($column == 'email') {
		$failedEmail = get_post_meta($post_id, DRAG_BLOCK_FORM_ENTRY . '-failed-email', true);
		if ($failedEmail === 'PASSED') {
			echo '<span class="dragblock-form-emailed-successful">' . __('SENT', 'dragblock') . '</span>';
			
		} else if (!$failedEmail){
			echo '<strong class="dragblock-form-emailed-local">' . __('LOCAL', 'dragblock') . '</strong>';
		} else {
			echo '<strong class="dragblock-form-emailed-failed">' . __('FAILED', 'dragblock') . '</strong>';
		}
	}
}
