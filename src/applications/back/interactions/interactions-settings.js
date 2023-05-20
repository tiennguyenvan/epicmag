import { __ } from '@wordpress/i18n';

export const interactionsNames = {
	/**
	 * LINK
	 */
	'click': {
		keyword: 'mouse click',
		label: __('Click', 'dragblock'),
		note: __('Mouse Click', 'dragblock'),
		type: 'mouse'
	},
	'mouseenter': {
		keyword: 'mouse enter',
		label: __('MouseEnter', 'dragblock'),
		note: __('Mouse Enter an Element', 'dragblock'),
		type: 'mouse'
	},
	'mouseleave': {
		keyword: 'mouse leave',
		label: __('MouseLeave', 'dragblock'),
		note: __('Mouse Leave an Element', 'dragblock'),
		type: 'mouse'
	}
}

/**
 * @info register custom HTML interactions and supports features
 */
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/interactions-register',
	function (settings, name) {
		// for all blocks
		settings = Object.assign({}, settings, {
			// override the attributes in the block.json files
			attributes: Object.assign({}, settings.attributes, {

				// classname and id (anchor) are supported from the Advanced tab
				// so we don't define them here
				// ****************************************************************
				// we use this all-in-one method so we don't have to have a long code
				// in save / edit function. Also easy to add more properties for the tag attributes
				// in the future
				// ****************************************************************
				// just in case we could have conditions for attributes so we can add many attributes
				// that have the same name but different properties. This is the reason why we have
				// to define the dragBlockAttrs as an array
				/**
				**** SUPER SIMPLE VERSIONS ********************************
				dragBlockScripts : [
					{						
						slug: 'onClick',						
						which: '', // right click, cltr+C, ...
						source: '',
						action: 'toggle'
						value: '.active',
						target: '',
						disabled: ''
					}
				]

				**** SIMPLE VERSIONS ********************************
				dragBlockScripts [
					{
						events: [
							{
								type: 'mouse'
								value: 'click'
							}							
						],
						actions: [
							{
								type: 'toggle',
								value: '.active'
							}
						],
						disabled: [
							'*'
						]
					}
				]

				**** COMPLICATEED
				dragBlockScripts: [
					{						
						name: 'Open Mobile Menu',
						id: 'unique-ID',						
						events: [
							{
								type: ['click', 'ctrl+m'],
								on: '.mobile-menu-toggle'
							},
							{
								type: ['and']
								events: [
									{																				
										'type': ['click', 'click+ctrl+p', 'onload'],
										'source': '.main-menu'
									},
								]
							}
						],
						conditions: [
							{
								type: 'isDevice',
								device: ['mobile']
							}
						],
						actions: [
							{
								type: 'toggleClass',
								class: '.active',
								apply-to: '.mobile-menu'
							}
						],
						else-actions: [

						]
						disabled: '' // f = disabled on front-end, b = disabled on back-end, * = disabled on all
					}
				]				
				 */
				
				dragBlockScripts: {type: 'array',default: '',},
				dragBlockJS: { type: 'string', default: '' },
				/*
				SHORT JAVASCRIPT				
				We think that the best way for users to develop complicated apps
				is to allow them to type the code with lots of support from our
				tools. This method offers them freedom, flexibility, and also allows
				us to parse the code easier.
				It's also very easy for users to copy/paste code to another blocks/projects
				You should consider of using this method for dragBlockStyles because out of
				the above benefits, developers could edit the code themselves 

				However, building this type of language would take time so we could stick with
				the same methods as dragBlockStyles or dragBlockAttrs, but then if we have more resources
				we could cover all dragBlockScripts intances into this SJS language.

				
				*/
				// dragBlockSJS: {
				// 	type: 'string',
				// 	default: '',
				// }
			}),
		});

		// for DragBlockblocks		
		// if ((name.indexOf('dragblock') != -1)) {
		// 	settings = Object.assign({}, settings, {
		// 		// override the attributes in the block.json files
		// 		attributes: Object.assign({}, settings.attributes, {
		// 			anchor: {
		// 				type: 'string',
		// 				source: 'attribute',
		// 				default: '',
		// 				attribute: 'id',
		// 				selector: '*', // very important
		// 			},
		// 		}),
		// 		// override the supports in the block.js files
		// 		supports: Object.assign({}, settings.supports, {
		// 			// allow input an ID for blocks in the Advanced panel
		// 			anchor: true,
		// 		}),
		// 	});
		// }

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


