import { __ } from '@wordpress/i18n';

export const attributesNames = {
	/**
	 * LINK
	 */
	'href': {
		keyword: 'href link url',
		label: __('Href', 'dragblock'),
		note: __('URL of the link', 'dragblock'),
		type: 'text'
	},
	'target': {
		keyword: 'target',
		label: __('Target', 'dragblock'),
		note: __('Target window, tab, or element to open the link', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: '_blank', label: __('Blank', 'dragblock') },
			{ value: '_parent', label: __('Parent', 'dragblock') },
			{ value: '_self', label: __('Self', 'dragblock') },
			{ value: '_top', label: __('Top', 'dragblock') },
		]
	},
	'rel': {
		keyword: 'rel',
		label: __('Rel', 'dragblock'),
		note: __('Relationship between the linked resource and the current document', 'dragblock'),
		type: 'text'
	},
	'tabindex': {
		keyword: 'tabindex',
		label: __('Tab Index', 'dragblock'),
		note: __('Order in focus navigating sequence', 'dragblock'),
		type: 'number'
	},

	/**
	 * IMAGES
	 */
	'src': {
		keyword: 'src',
		label: __('Src', 'dragblock'),
		note: __('URL of the media', 'dragblock'),
		type: 'text',
	},
	'alt': {
		keyword: 'alt',
		label: __('Alt', 'dragblock'),
		note: __('Alternative text', 'dragblock'),
		type: 'multilingual-text',
	},

	/**
	 * FORM
	 */

	'name': {
		keyword: 'name',
		label: __('Name', 'dragblock'),
		note: __('Name', 'dragblock'),
		type: 'text',
	},
	'placeholder': {
		keyword: 'placeholder',
		label: __('Placeholder', 'dragblock'),
		note: __('Placeholder', 'dragblock'),
		type: 'multilingual-text',
	},

	'title': {
		keyword: 'title',
		label: __('Title', 'dragblock'),
		note: __('title', 'dragblock'),
		type: 'multilingual-text',
	},
	'type': {
		keyword: 'type',
		label: __('Type', 'dragblock'),
		note: __('type', 'dragblock'),
		type: 'select',
		options: [

			{ value: 'text', label: __('Text', 'dragblock') },
			{ value: 'submit', label: __('Submit', 'dragblock') },
			{ value: 'password', label: __('Password', 'dragblock') },
			{ value: 'checkbox', label: __('Checkbox', 'dragblock') },
			{ value: 'radio', label: __('Radio', 'dragblock') },
			{ value: 'button', label: __('Button', 'dragblock') },
			{ value: 'number', label: __('Number', 'dragblock') },
			{ value: 'email', label: __('Email', 'dragblock') },
			{ value: 'tel', label: __('Phone', 'dragblock') },
			{ value: 'url', label: __('URL', 'dragblock') },
			{ value: 'date', label: __('Date', 'dragblock') },
			{ value: 'time', label: __('Time', 'dragblock') },
			{ value: 'month', label: __('Month', 'dragblock') },
			{ value: 'week', label: __('Week', 'dragblock') },
			{ value: 'range', label: __('Range', 'dragblock') },
			{ value: 'color', label: __('Color', 'dragblock') },
			{ value: 'search', label: __('Search', 'dragblock') },
			{ value: 'file', label: __('File', 'dragblock') },
			{ value: 'hidden', label: __('Hidden', 'dragblock') },
			{ value: 'reset', label: __('Reset', 'dragblock') },
		]
	},
	'value': {
		keyword: 'value',
		label: __('Value', 'dragblock'),
		note: __('value', 'dragblock'),
		type: 'text',
	},

	'disabled': {
		keyword: 'tabindex',
		label: __('Tab Index', 'dragblock'),
		note: __('Not mutable, focusable, or even submitted with the form', 'dragblock'),
		type: 'text',
	},
	'required': {
		keyword: 'required',
		label: __('Required', 'dragblock'),
		note: __('required', 'dragblock'),
		type: 'text',
	},
	'selected': {
		keyword: 'selected',
		label: __('Selected', 'dragblock'),
		note: __('selected', 'dragblock'),
		type: 'text',
	},
	'action': {
		keyword: 'action',
		label: __('Action', 'dragblock'),
		note: __('action', 'dragblock'),
		type: 'action',
	},
	'method': {
		keyword: 'method',
		label: __('Method', 'dragblock'),
		note: __('method', 'dragblock'),		
		type: 'select',
		options: [
			{value: 'POST', label: __('POST', 'dragblock')},
			{value: 'GET', label: __('GET', 'dragblock')},
			// {value: 'CONNECT', label: __('CONNECT', 'dragblock')},
			// {value: 'DELETE', label: __('DELETE', 'dragblock')},
			// {value: 'HEAD', label: __('HEAD', 'dragblock')},
			// {value: 'OPTIONS', label: __('OPTIONS', 'dragblock')},
			// {value: 'PATCH', label: __('PATCH', 'dragblock')},
			// {value: 'PUT', label: __('PUT', 'dragblock')},
			// {value: 'TRACE', label: __('TRACE', 'dragblock')},
		]
	},
	'for': {
		keyword: 'for',
		label: __('For', 'dragblock'),
		note: __('For a block with certain ID', 'dragblock'),
		type: 'text',
	},
	'decoding': {
		keyword: 'decoding decode load image',
		label: __('Decoding', 'dragblock'),
		note: __('Decode image asynchronously or synchronously', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'async', label: __('Async', 'dragblock') },
			{ value: 'sync', label: __('Sync', 'dragblock') },
		]
	},
}

/**
 * 
 * @param {*} attrList : {index: attr : {slug, value, disabled}}
 * @param {*} slug 
 * @returns 
 */
export const findAttrIndex = (attrList, slug) => {
	if (attrList) {
		for (let [index, attr] of attrList.entries()) {
			if (attr['slug'] == slug && !attr['disabled']) return index
		}
	}

	return -1;
}
export const getAttr = (attrList, slug) => {
	let index = findAttrIndex(attrList, slug)
	if (index == -1) return null
	return attrList[index]['value']
}
export const deleteAttr = (attrList, slug) => {
	let index = findAttrIndex(attrList, slug);
	if (index > -1) {
		attrList.splice(index, 1);
	}
}
export const setAttr = (attrList, slug, value) => {
	let index = findAttrIndex(attrList, slug)
	if (index == -1) {
		attrList.unshift({
			'slug': slug,
			'value': value
		});
		return attrList;
	}
	attrList[index]['value'] = value;
}

/**
 * @info register custom HTML attributes and supports features
 */
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/attributes-register',
	function (settings, name) {
		// for all blocks
		settings = Object.assign({}, settings, {
			// override the attributes in the block.json files
			attributes: Object.assign({}, settings.attributes, {
				// use to apply custom css
				// we have to use in-object attribute here to have data for front-end to modify the implied blocks (like nav-link)
				// dragBlockClientId: {
				// 	type: 'string',
				// 	source: 'attribute',
				// 	attribute: 'data-dragBlock-client-id',
				// 	default: '',
				// 	selector: '*',
				// },
				dragBlockClientId: {
					type: 'string',
				},

				// classname and id (anchor) are supported from the Advanced tab
				// ****************************************************************				
				anchor: {
					type: 'string',
					source: 'attribute',
					default: '',
					attribute: 'id',
					selector: '*', // very important
				},

				className: {
					type: 'string',
					default: '',
				},

				// we use this all-in-one method so we don't have to have a long code
				// in save / edit function. Also easy to add more properties for the tag attributes
				// in the future
				// ****************************************************************
				// just in case we could have conditions for attributes so we can add many attributes
				// that have the same name but different properties. This is the reason why we have
				// to define the dragBlockAttrs as an array
				/**
				dragBlockAttrs: [
					{
						slug : 'tabindex',
						value: '',
						disabled: '' // f = disabled on front-end, b = disabled on back-end, * = disabled on all
					}
				]				
				 */
				dragBlockAttrs: {
					type: 'array',
					default: '',
				},
			}),
		});

		// for DragBlock blocks		
		if ((name.indexOf('dragblock') != -1)) {
			settings = Object.assign({}, settings, {
				// override the attributes in the block.json files
				attributes: Object.assign({}, settings.attributes, {
					// anchor: {
					// 	type: 'string',
					// 	source: 'attribute',
					// 	default: '',
					// 	attribute: 'id',
					// 	selector: '*', // very important
					// },
				}),
				// override the supports in the block.js files
				supports: Object.assign({}, settings.supports, {
					// allow input an ID for blocks in the Advanced panel
					anchor: true,
				}),
			});
		}

		// for certain blocks
		// if ((name == 'dragblock/link')) {
		// 	settings = Object.assign({}, settings, {
		// 		// override the attributes in the block.json files
		// 		attributes: Object.assign({}, settings.attributes, {
		// 			dragBlockAttrHref: {
		// 				type: 'string', 
		// 				source: 'attribute',
		// 				attribute: 'href',
		// 				default: '',
		// 				selector: '*', 
		// 			},
		// 			dragBlockAttrTarget: {
		// 				type: 'string', 
		// 				source: 'attribute',
		// 				attribute: 'target',
		// 				default: '',
		// 				selector: '*', 
		// 			},
		// 			dragBlockAttrRel: {
		// 				type: 'string', 
		// 				source: 'attribute',
		// 				attribute: 'rel',
		// 				default: '',
		// 				selector: '*', 
		// 			},
		// 		}),
		// 	});
		// }


		return settings;
	}
);


