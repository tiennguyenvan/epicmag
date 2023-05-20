
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	useSetting
} from '@wordpress/block-editor';
import { cloneDeep } from 'lodash';




export function dragBlockAppearanceCSS({props, colors, contentSize, wideSize}) {



	const { attributes, setAttributes, isSelected, clientId } = props;
    let { dragBlockStyles, dragBlockClientId, dragBlockCSS } = attributes;

	if (!dragBlockStyles) {
		if (dragBlockCSS) {
			setAttributes({dragBlockCSS: ''});
		}
		return;
	}

	// let edit_selector = '#block-' + clientId;
	let edit_selector = '[data-dragBlock-client-id="'+dragBlockClientId+'"]'; // already modify in BlockListBlock
	let save_selector = '[data-dragBlock-client-id="'+dragBlockClientId+'"]';
	let default_self_selector_placeholder = '{default_self_selector}'
	let default_body_tag_selector_placeholder = '{default_body_selector}'
	let default_id_selector_placeholder = '{default_id_selector}';

	/**
	 * 
	style = {
		all: {// all devices
			selector : { // full selector including parent, parent states and self states. The default_self_selector will be replace later
				slug : value
			}
		}
	}
	 */
	let style = {}
	
	// parse the style object
	
	let style_props = cloneDeep(dragBlockStyles);
	
	style_props.reverse();
	for (let prop of style_props) {
		// we don't need to generate value for
		// - disabled properties: at this time, if the has disabled then disabled
		// but in the future, disable the property in all contexts if the value is *
		// disable in front-end if the value is "f" and back-end if "b"
		// - properties that have no value
		if (
			prop['disabled'] ||
			prop['value'] === ''
		) continue;
				
		// calculate the devices and states
		let devices = '';
		if (prop['devices']) {	
			if (prop['devices'].indexOf('d') != -1) devices += 'd';
			if (prop['devices'].indexOf('t') != -1) devices += 't';
			if (prop['devices'].indexOf('m') != -1) devices += 'm';
		}
		if (!devices || devices.length == 3) devices = 'ALL';

				
		
		// let self_selectors = prop['selectors'] ? prop['selectors'].split(',').map(e=>e.trim()) : [default_self_selector_placeholder];
		// let states = [];
		// if (prop['states']) {		
		// 	if (prop['states'].indexOf('h') != -1) states.push(':hover');
		// 	if (prop['states'].indexOf('a') != -1) states.push(':active');
		// 	if (prop['states'].indexOf('f') != -1) states.push(':focus');
		// }
		
		// let parent_states = [];
		// if (prop['parent-states']) {
		// 	if (prop['parent-states'].indexOf('h') != -1) parent_states.push(':hover');
		// 	if (prop['parent-states'].indexOf('a') != -1) parent_states.push(':active');
		// 	if (prop['parent-states'].indexOf('f') != -1) parent_states.push(':focus');
		// }	
		
		// let parent_selectors = (prop['parent-selectors'] ? prop['parent-selectors'].split(',').map(e=>e.trim()) : (
		// 	parent_states.length ? ['*'] : []
		// ));
		
		////////////////////
		// GENERATE SELECTOR
		////////////////////
		// let selector = '';

		// let self_sel = [];
		// for (let state of states) {
		// 	self_selectors.map(e=>{
		// 		self_sel.push(e+state);
		// 	})
		// }
		// if (!self_sel.length) self_sel = self_selectors;

		// let par_sel = [];
		
		// for (let state of parent_states) {
		// 	parent_selectors.map(e=>{				
		// 		// space here is very important
		// 		// this is when user selects state for parent 
		// 		// but did not input the selector
		// 		// so we should specify the near parent instead
		// 		// all parents of the current element
		// 		par_sel.push(e+state + (e=='*' ? '>' : ' ')); 
		// 	})
		// }
		// if (!par_sel.length) par_sel = parent_selectors.map(e=>e+' ');
		

		// for (let ssel of self_sel) {			
		// 	if (par_sel.length) {
		// 		for (let psel of par_sel) {
		// 			selector += (selector ? ',' :  '') + psel+ssel;
		// 		}
		// 	} else {
		// 		selector += (selector ? ',' :  '') + ssel
		// 	}
		// }

		// // add default body tag selector to have a higher priority for editor when replace that with body.editor-style-wrapper
		// selector = default_body_tag_selector_placeholder + selector

		let selectors = prop['selectors'] ? prop['selectors'].split(',').map(e=>{
			// if the selectors has only the states, we need to to add the default_self_selector_placeholder
			e = e.trim()
			if (e.indexOf(':') === 0) {
				e = default_body_tag_selector_placeholder + default_self_selector_placeholder +  e;
			}

			return e;
			
		}).join(',') :  default_body_tag_selector_placeholder + default_self_selector_placeholder ;
		
		selectors = selectors.replaceAll('#', default_id_selector_placeholder);
		
		///////////////////
		// GENERATE STYLES
		///////////////////
		if (!style[devices]) style[devices] = {}

		if (!style[devices][selectors]) style[devices][selectors] = {};
		if (!style[devices][selectors][prop.slug]) {
			style[devices][selectors][prop.slug] = '';
		}

		// properties could be stacked together and separate by commas
		prop.value = String(prop.value);

		if (prop.slug.indexOf('-shadow') != -1 || prop.slug === 'background-img') {			
			style[devices][selectors][prop.slug] += (style[devices][selectors][prop.slug] ? ',' : '') + prop.value;
		} 
		// properties could be stacked together and separate by spaces
		else if (prop.slug === 'display' || prop.slug === 'transform') {
			style[devices][selectors][prop.slug] += (style[devices][selectors][prop.slug] ? ' ' : '') + prop.value;
		}
				
		else {
			style[devices][selectors][prop.slug] = prop.value;
		}
	}

	// console.log(style);

	// wrapping with selector and conditions	
	let edit_css = '';
	let save_css = '';
	

	/* media: 
		'' || len == 3 => no media
		d = desktop only => @media screen and (min-width: 1025px)
		t = tablet only => @media screen and (min-width: 768px) and (max-width: 1024px)
		m = mobile only => @media screen and (max-width: 767px)
		dt || td = desktop and tablet => @media screen and (min-width: 768px)
		dm || mt = desktop and mobile => @media screen and (min-width: 1025px), screen and (max-width: 767px)
		tm || tm = tablet and mobile => @media screen and (max-width: 1024px)
	*/
	for (let devices in style) {
		
		let inline_css = '';
		for (let selector in style[devices]) {						
			inline_css += (
				selector + '{'+
					Object.entries(style[devices][selector]).map(([key, value]) => (key + ':' + value)).join(';')
				+'}'
			)			
		}
		if (devices == 'ALL') save_css += inline_css;
		if (devices == 'd') save_css += '@media screen and (min-width: 1025px) {' + inline_css + '}';
		if (devices == 't') save_css += '@media screen and (min-width: 768px) and (max-width: 1024px) {' + inline_css + '}';
		if (devices == 'm') save_css += '@media screen and (max-width: 767px) {' + inline_css + '}';
		if (devices == 'dt') save_css += '@media screen and (min-width: 768px) {' + inline_css + '}';
		if (devices == 'dm') save_css += '@media screen and (min-width: 1025px), screen and (max-width: 767px) {' + inline_css + '}';
		if (devices == 'tm') save_css += '@media screen and (max-width: 1024px) {' + inline_css + '}';	
	}
	
	// edit css need to be replaced the variables
	edit_css = save_css;
	// replace colors here
	for (let color of colors) {
		// perfect match
		edit_css = edit_css.replaceAll('{c='+color.slug+'}', color.color);

		// without alpha match
		edit_css = edit_css.replaceAll('{c='+color.slug+'@}', color.color.substring(0,7));
		
	}
	// // no longer need to replace layout variable because they are matched with the real variables
	// edit_css = edit_css.replaceAll('{s=content}', contentSize)
	// edit_css = edit_css.replaceAll('{s=wide}', wideSize)
	
	edit_css = edit_css.replaceAll(default_self_selector_placeholder, edit_selector)
	edit_css = edit_css.replaceAll(default_body_tag_selector_placeholder, 'body.editor-styles-wrapper ');
	edit_css = edit_css.replaceAll(default_id_selector_placeholder, '.dragblock-id-classname-placeholder-');

	// save css so front-end apps could generate their on their own
	// this should stay under the edit css because you will replace the default selector here
	save_css = save_css.replaceAll(default_self_selector_placeholder, save_selector)
	save_css = save_css.replaceAll(default_body_tag_selector_placeholder, '');
	save_css = save_css.replaceAll(default_id_selector_placeholder, '#');
	if (dragBlockCSS != save_css) {
		setAttributes({dragBlockCSS: save_css});
	}
	// console.log(edit_css);

	if (edit_css) return (
		<>
			<style>{edit_css}</style>
		</>
	)
	return (<></>)
}


/**
 * @info Add setting controls to the Inspector Panels or the Toolbar
 */
const dragBlockAppearanceStyle = createHigherOrderComponent((BlockEdit) => {
	return (props) => {        
		
        const avaiColors = useSetting('color.palette.theme').concat(useSetting('color.palette.custom') || [])/*.concat(useSetting('color.palette.default'));;*/
		const contentSize = useSetting('layout.contentSize');
        const wideSize = useSetting('layout.wideSize');
		
		return (
			<>
				<BlockEdit {...props} />
				{/*props.name.indexOf('dragblock') != -1 */ true && (
                    <>
                        { dragBlockAppearanceCSS({props, colors: avaiColors, contentSize, wideSize}) }
                    </>
                    )
				}
			</>
		);
	};
}, 'dragBlockAppearanceStyle');
 
wp.hooks.addFilter(
	'editor.BlockListBlock',
	'dragblock/apperance-style',
	dragBlockAppearanceStyle
);
