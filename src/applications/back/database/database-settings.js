import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';


export const databaseParams = {
	// AUTHORS
	// ------------	
    'author__in': {
		keyword: 'author in',
		label: __('Author In', 'dragblock'),
		note: __('Posts published by one of these authors', 'dragblock'),
		type: 'users'
	},
    'author__not_in': {
		keyword: 'author not in',
		label: __('Author Not In', 'dragblock'),
		note: __('Except posts from these authors', 'dragblock'),
		type: 'users',
	},

    // CATEGORY
	// ------------	
    'category__and': {
		keyword: 'category and',
		label: __('Category And', 'dragblock'),
		note: __('Posts that has all these categories', 'dragblock'),
		type: 'categories',
	},
    'category__in': {
		keyword: 'category in',
		label: __('Category In', 'dragblock'),
		note: __('Posts that has one of these categories', 'dragblock'),
		type: 'categories',
	},
    'category__not_in': {
		keyword: 'category not in',
		label: __('Category Not In', 'dragblock'),
		note: __('Except posts from these categories', 'dragblock'),
		type: 'categories',
	},

    // TAG
	// ------------	
    'tag__and': {
		keyword: 'tag and',
		label: __('Tag And'),
		note: __('Posts that has all these tags', 'dragblock'),
		type: 'tags',
	},
    'tag__in': {
		keyword: 'tag in',
		label: __('Tag In', 'dragblock'),
		note: __('Posts that has one of these tags', 'dragblock'),
		type: 'tags',
	},
    'tag__not_in': {
		keyword: 'tag not in',
		label: __('Tag Not In', 'dragblock'),
		note: __('Except posts from these tags', 'dragblock'),
		type: 'tags',
	},

    // POST
	// ------------	
    'post_type': {
		keyword: 'post type',
		label: __('Post Type', 'dragblock'),
		note: __('Type of the posts you want to get from the database', 'dragblock'),
		type: 'select',
		options: [
			{value: '', label: __('Default', 'dragblock'),},
			{value: 'post', label: __('Post', 'dragblock')},
			{value: 'page', label: __('Page', 'dragblock')},
			// {value: 'revision', label: __('revision', 'dragblock')},
			{value: 'attachment', label: __('Attachment', 'dragblock')},			
			// {value: 'nav_menu_item', label: __('nav_menu_item', 'dragblock')},
			{value: 'any', label: __('Any', 'dragblock')},			
		]
	},
    'post_status': {
		keyword: 'post status',
		label: __('Post Status', 'dragblock'),
		note: __('Only retrieve posts that has one of these statuses', 'dragblock'),
		type: 'select',
		options: [
			{value: '', label: __('Default', 'dragblock'),},
			{value: 'publish', label: __('Publish', 'dragblock')},
			{value: 'pending', label: __('Pending', 'dragblock')},
			{value: 'draft', label: __('Draft', 'dragblock')},			
			{value: 'auto-draft', label: __('Auto Draft', 'dragblock')},
			{value: 'future', label: __('Future', 'dragblock')},
			{value: 'private', label: __('Private', 'dragblock')},
			{value: 'inherit', label: __('Inherit', 'dragblock')},
			{value: 'trash', label: __('Trash', 'dragblock')},
			{value: 'any', label: __('Any', 'dragblock')},			
		]
	},
    'post_parent__in': {
		keyword: 'post parent',
		label: __('Parent In', 'dragblock'),
		note: __('Posts that are children of one of these parent posts', 'dragblock'),
		type: 'posts'
	},
    'post_parent__not_in': {
		keyword: 'post parent',
		label: __('Parent Not In', 'dragblock'),
		note: __('Except posts from these parent posts', 'dragblock'),
		type: 'posts'
	},
    'post__in': {
		keyword: 'fix certain post',
		label: __('Post In', 'dragblock'),
		note: __('Only get these posts', 'dragblock'),
		type: 'posts'
	},
    'post__not_in': {
		keyword: 'not certain post',
		label: __('Post Not In', 'dragblock'),
		note: __('Except these posts','dragblock'),
		type: 'posts'
	},
    'post_password': {
		keyword: 'post password',
		label: __('Password', 'dragblock'),
		note: __('Posts that have this password'),
		type: 'text'
	},
    'has_password': {
		keyword: 'has password',
		label: __('Has Password', 'dragblock'),
		note: __('Posts that have a password', 'dragblock'),
		type: 'checkbox',
	},

    // 'comment_count': {
	// 	keyword: 'comment count',
	// 	label: __('Comment Count', 'dragblock'),
	// 	note: __('Posts that have a certain comment count', 'dragblock'),
	// 	type: 'number_compare'
	// },


    'posts_per_page': {
		keyword: 'posts per page',
		label: __('Posts Per Page', 'dragblock'),
		note: __('Max number of posts to return', 'dragblock'),
		type: 'number',
	},
    'paged': {
		keyword: 'paged',
		label: __('Page Number', 'dragblock'),
		note: __('Posts from this page number', 'dragblock'),
		type: 'number',
	},
    'ignore_sticky_posts': {
		keyword: 'ignore sticky posts',
		label: __('Ignore Sticky posts', 'dragblock'),
		note: __('Except sticky/pinned posts'),
		type: 'checkbox',
	},
    'order': {
		keyword: 'order',
		label: __('Order', 'dragblock'),
		note: __('Return posts as this order'),
		type: 'select',
		options: [
			{value: '', label: __('Descending', 'dragblock')},
			{value: 'ASC', label: __('Ascending', 'dragblock')}
		]
	},
    'order_by': {
		keyword: 'order by',
		label: __('Order By', 'dragblock'),
		note: __('Order posts by this factor'),
		type: 'select',
		options: [
			{value: '', label: __('Default', 'dragblock'),},
			{value: 'ID', label: __('By ID', 'dragblock')},
			{value: 'author', label: __('By Author', 'dragblock')},
			{value: 'title', label: __('By Title', 'dragblock')},
			// {value: 'name', label: __('By Name', 'dragblock')},
			// {value: 'type', label: __('By Type', 'dragblock')},
			{value: 'date', label: __('By Published Date', 'dragblock')},
			{value: 'modified', label: __('By Modified Date', 'dragblock')},
			{value: 'rand', label: __('By Random', 'dragblock')},
			{value: 'comment_count', label: __('By Comment Count', 'dragblock')},
			// {value: 'relevance', label: __('By Relevance', 'dragblock')},
			// {value: 'menu_order', label: __('By Menu Order', 'dragblock')},
			// {value: 'parent', label: __('By Parent', 'dragblock')},
			// {value: 'meta_value', label: __('By Author', 'dragblock')},
			{value: 'meta_value_num', label: __('By Meta Numeric Value', 'dragblock')},
		]
	},

    'meta_key': {
		keyword: 'meta key',
		label: __('Meta Key', 'dragblock'),
		note: __('Posts that have this meta data', 'dragblock'),
		type: 'text'
	},
    'meta_value': {
		keyword: 'meta value',
		label: __('Meta Value', 'dragblock'),
		note: __('Posts that have the meta data equals to this value', 'dragblock'),
		type: 'text'
	},

	'query_id': {
		keyword: 'query variable',
		label: __('Query Variable', 'dragblock'),
		note: __('Name of the query that has the data you want', 'dragblock'),
		type: 'query_variable'
	},

	'item_index': {
		keyword: 'item index number',
		label: __('Item Index', 'dragblock'),
		note: __('What item you want to parse', 'dragblock'),
		type: 'select',
		options: [
			{value: '', label: __('Default', 'dragblock')},
			{value: 0, label: __('0 (1st)', 'dragblock')},
			{value: 1, label: __('1 (2nd)', 'dragblock')},
			{value: 2, label: __('2 (3rd)', 'dragblock')},
			{value: 3, label: __('3 (4th)', 'dragblock')},
			{value: 4, label: __('4 (5th)', 'dragblock')},
			{value: 5, label: __('5 (6th)', 'dragblock')},
			{value: 6, label: __('6 (7th)', 'dragblock')},
			{value: 7, label: __('7 (8th)', 'dragblock')},
			{value: 8, label: __('8 (9th)', 'dragblock')},
			{value: 9, label: __('9 (10th)', 'dragblock')},
			{value: 10, label: __('10 (11th)', 'dragblock')},
			{value: 11, label: __('11 (12th)', 'dragblock')},
		]
	}
}

export const databaseQueries = {
    'WP_Query' : {
        keyword: 'get post page attachment user comment custom type',
        label: __('Get Posts', 'dragblock'),
        note: __('Get posts, pages, attachments, cutom types', 'dragblock'),
        params: [
            // 'author__in',
            // 'author__not_in',
            'category__and',
            'category__in',
            'category__not_in',
            'tag__and',
            'tag__in',
            'tag__not_in',

            'post_type',
            // 'post_status',
            // 'post_parent__in',
            // 'post_parent__not_in',
            // 'post__in',
            // 'post__not_in',
            // 'post_password',
            // 'has_password',

            // 'comment_count',
            'posts_per_page',
            'paged',
            'ignore_sticky_posts',
            'order',
            'order_by',

            'meta_key',
            'meta_value',
        ]
    },
	'parse_item' : {
		keyword: 'parse item',
		label: __('Parse Item', 'dragblock'),
		note: __('Parse data of an item from a query', 'dragblock'),
		params: [
			'query_id',
			'item_index',
		]
	}
}

/**
 * @info register custom attributes and supports features
 */
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/database-register',
	function (settings, name) {

		// for all blocks        
		settings = Object.assign({}, settings, {
			// override the attributes in the block.json files
			attributes: Object.assign({}, settings.attributes, {				
				/*
				dragBlockDatabase: [
					{
						slug: 'WP_Query',  // WP_User_Query // WP_Comemnt_QUERY // ...
                        title: '',
                        id: 'block_DragBlockClientID_clientID',
                        params: [
							{
								slug: '',
								value: '',
								disabled: '',								
							},							
						]
                        
						disabled: '' // f = disabled on front-end, b = disabled on back-end, * = disabled on all                        
					},
				]
				*/
				dragBlockQueries: { type: 'array', default: '' },
				dragBlockPHP: { type: 'string', default: '' },
			}),
		});
		return settings;
	}
);


