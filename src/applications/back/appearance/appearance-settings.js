import { __ } from '@wordpress/i18n';
import { cloneDeep } from 'lodash';

// show to many properties at the beginning could lead to stress
// so we show only the essential and easy to understand properties
// this is to train users to work with the inspector usually
// for absurd and complex properties, use toolbar to support an easy way to add
export const defaultProperties = [

	{ slug: 'display', value: '' },
	{ slug: 'color', value: '' },
	{ slug: 'background-color', value: '' },
	// {slug: 'font-size', value: ''},
	// {slug: 'font-weight', value: ''},
	// {slug: 'line-height', value: ''},
	// {slug: 'letter-spacing', value: ''},
	// {slug: 'text-decoration', value: ''},
	// {slug: 'text-transform', value: ''},
	{ slug: 'border', value: '' },
	{ slug: 'border-radius', value: '' },
	{ slug: 'padding', value: '' },
	{ slug: 'margin-top', value: '' },
	{ slug: 'margin', value: '' },
	// {slug: 'box-shadow', value: ''},
	// {slug: 'text-shadow', value: ''},
	// { slug: 'animation-name', value: '' },
];

export const initDragBlockStyles = (propname) => {
	let dragBlockStyles = new Array();

	dragBlockStyles.push(cloneDeep({ slug: 'display', value: '' }))
	if (['dragblock/link', 'dragblock/text', 'dragblock/icon'].includes(propname) ||
		propname.indexOf('dragblock/') === -1
	) {
		dragBlockStyles.push(cloneDeep({ slug: 'font-size', value: '' }))
		dragBlockStyles.push(cloneDeep({ slug: 'font-weight', value: '' }))
		dragBlockStyles.push(cloneDeep({ slug: 'line-height', value: '' }))
	}
	if (['dragblock/wrapper'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'flex-wrap', value: '', devices: '' }))
		dragBlockStyles.push(cloneDeep({ slug: 'row-gap', value: '' }))
		dragBlockStyles.push(cloneDeep({ slug: 'column-gap', value: '' }))
	}

	if (['dragblock/wrapper', 'dragblock/image', 'dragblock/link'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'width', value: '' }))
		dragBlockStyles.push(cloneDeep({ slug: 'height', value: '' }))
	}
	if (['dragblock/image'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'object-fit', value: 'cover' }))
	}

	dragBlockStyles.push(cloneDeep({ slug: 'color', value: '' }))
	dragBlockStyles.push(cloneDeep({ slug: 'background-color', value: '' }))
	dragBlockStyles.push(cloneDeep({ slug: 'padding', value: '' }))
	dragBlockStyles.push(cloneDeep({ slug: 'margin-top', value: '' }))
	
	if (['dragblock/wrapper'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'margin', value: '' }))
	}
	dragBlockStyles.push(cloneDeep({ slug: 'border', value: '' }))
	dragBlockStyles.push(cloneDeep({ slug: 'border-radius', value: '' }))

	if (['dragblock/link', 'dragblock/text', 'dragblock/icon'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'text-shadow', value: '' }))
	}

	if (['dragblock/wrapper'].includes(propname)) {
		dragBlockStyles.push(cloneDeep({ slug: 'box-shadow', value: '' }))
	}

	dragBlockStyles.push(cloneDeep({ slug: 'animation-name', value: '' }))


	return cloneDeep(dragBlockStyles);
}

export const appearanceProperties = {
	// BASIC COLORS
	// ------------
	'color': {
		keyword: 'text color',
		label: __('Text Color', 'dragblock'),
		note: __('Color for text', 'dragblock'),
		type: 'color'
	},
	'background-color': {
		keyword: 'background color',
		label: __('Background Color', 'dragblock'),
		note: __('Color for the background', 'dragblock'),
		type: 'color'
	},


	'height': {
		keyword: 'height vertical size',
		label: __('Height', 'dragblock'),
		note: __('Vertical Size', 'dragblock'),
		type: 'height'
	},
	'width': {
		keyword: 'width horizontal size',
		label: __('Width', 'dragblock'),
		note: __('Horizontal Size', 'dragblock'),
		type: 'width'
	},
	'max-width': {
		keyword: 'max width horizontal size',
		label: __('Max Width', 'dragblock'),
		note: __('Max Horizontal Size', 'dragblock'),
		type: 'width'
	},
	'min-width': {
		keyword: 'min width horizontal size',
		label: __('Min Width', 'dragblock'),
		note: __('Min Horizontal Size', 'dragblock'),
		type: 'width'
	},


	// TYPOGRAPHY
	// ------------
	'font-size': {
		keyword: 'text font size',
		label: __('Font Size', 'dragblock'),
		note: __('Size of text', 'dragblock'),
		type: 'font-size'
	},
	'font-weight': {
		keyword: 'text font weight appearance bold',
		label: __('Font Weight', 'dragblock'),
		note: __('The weight or boldness of the appearance of text', 'dragblock'),
		type: 'font-weight'
	},
	'line-height': {
		keyword: 'text font line height gap spacing distance single double',
		label: __('Line Height', 'dragblock'),
		note: __('The distance between lines of text', 'dragblock'),
		type: 'line-height'
	},
	'letter-spacing': {
		keyword: 'text character letter gap spacing',
		label: __('Letter Spacing', 'dragblock'),
		note: __('Horizontal spacing between text characters', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -10, max: 20, step: .5, default: 0
			}
		}
	},
	'text-decoration': {
		keyword: 'text underline strikethrough',
		label: __('Text Decoration', 'dragblock'),
		note: __('Set text underline or strikethrough', 'dragblock'),
		type: 'text-decoration'
	},
	/*
	'text-decoration-color' : {
		keyword: 'text underline strikethrough color',
		label: __('Text Decoration Color', 'dragblock'),
		note: __('Set text decoration color', 'dragblock'),
		type: 'color'
	},
	'text-decoration-line' : {
		keyword: 'text underline strikethrough kind position line',
		label: __('Text Decoration Line', 'dragblock'),
		note: __('Line position of text decoration', 'dragblock'),
		type: 'text-decoration-line'
	},
	'text-decoration-style' : {
		keyword: 'text underline strikethrough style design line',
		label: __('Text Decoration Style', 'dragblock'),
		note: __('Design style of text decoration', 'dragblock'),
		type: 'text-decoration-style'
	},
	'text-decoration-thickness' : {
		keyword: 'text underline strikethrough line width thickness size stroke',
		label: __('Text Decoration Thickness', 'dragblock'),
		note: __('Stroke size of text decoration', 'dragblock'),
		type: 'unit'
	},
	*/
	'text-transform': {
		keyword: 'capitalize uppercase lowercase letter text case transform',
		label: __('Text Transform', 'dragblock'),
		note: __('Set text letter case: all-uppercase, all lowercase, or word capitalized', 'dragblock'),
		type: 'text-transform'
	},
	'text-align': {
		keyword: 'text align horizon inline content text',
		label: __('Text Align', 'dragblock'),
		note: __('Horizontal alignment of the inline-level content ', 'dragblock'),
		type: 'text-align'
	},

	// BORDER
	// ------------
	'border': {
		keyword: 'edge border strokes',
		label: __('Border', 'dragblock'),
		note: __('Set appearance style for strokes)', 'dragblock'),
		type: 'border'
	},
	'border-top': {
		keyword: 'edge border strokes top side',
		label: __('Border Top', 'dragblock'),
		note: __('Set appearance style for strokes of the top side)', 'dragblock'),
		type: 'border'
	},
	'border-right': {
		keyword: 'edge border strokes right side',
		label: __('Border Right', 'dragblock'),
		note: __('Set appearance style for strokes of the right side)', 'dragblock'),
		type: 'border'
	},
	'border-bottom': {
		keyword: 'edge border strokes bottom side',
		label: __('Border Bottom', 'dragblock'),
		note: __('Set appearance style for strokes of the bottom side)', 'dragblock'),
		type: 'border'
	},
	'border-left': {
		keyword: 'edge border strokes bottom left',
		label: __('Border Left', 'dragblock'),
		note: __('Set appearance style for strokes of the left side)', 'dragblock'),
		type: 'border'
	},

	// - BORDER COLOR
	'border-color': {
		keyword: 'edge border strokes color',
		label: __('Border Color', 'dragblock'),
		note: __('Color of strokes', 'dragblock'),
		type: 'color'
	},
	'border-top-color': {
		keyword: 'edge border top stroke color',
		label: __('Border Top Color ', 'dragblock'),
		note: __('Color of top side stroke', 'dragblock'),
		type: 'color'
	},
	'border-right-color': {
		keyword: 'edge border right stroke color',
		label: __('Border Right Color ', 'dragblock'),
		note: __('Color of right side stroke', 'dragblock'),
		type: 'color'
	},
	'border-bottom-color': {
		keyword: 'edge border bottom stroke color',
		label: __('Border Bottom Color ', 'dragblock'),
		note: __('Color of bottom side stroke', 'dragblock'),
		type: 'color'
	},
	'border-left-color': {
		keyword: 'edge border left stroke color',
		label: __('Border Left Color ', 'dragblock'),
		note: __('Color of left side stroke', 'dragblock'),
		type: 'color'
	},


	// - BORDER WIDTH
	'border-width': {
		keyword: 'edge border stroke width size',
		label: __('Border Width', 'dragblock'),
		note: __('Size of Strokes', 'dragblock'),
		type: 'unit'
	},
	'border-top-width': {
		keyword: 'edge border stroke top side width size',
		label: __('Border Top Width', 'dragblock'),
		note: __('Size of top side stroke', 'dragblock'),
		type: 'unit'
	},
	'border-right-width': {
		keyword: 'edge border stroke right side width size',
		label: __('Border Right Width', 'dragblock'),
		note: __('Size of right side stroke', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-width': {
		keyword: 'edge border stroke bottom side width size',
		label: __('Border Bottom Width', 'dragblock'),
		note: __('Size of bottom side stroke', 'dragblock'),
		type: 'unit'
	},
	'border-left-width': {
		keyword: 'edge border stroke left side width size',
		label: __('Border Left Width', 'dragblock'),
		note: __('Size of left side stroke', 'dragblock'),
		type: 'unit'
	},


	// - BORDER STYLE
	'border-style': {
		keyword: 'edge border stroke line style design dotted dashed solid',
		label: __('Border Style', 'dragblock'),
		note: __('Line style or design of strokes', 'dragblock'),
		type: 'border-style'
	},
	'border-top-style': {
		keyword: 'edge border top side stroke style design dotted dashed solid',
		label: __('Border Top Style', 'dragblock'),
		note: __('Line style or design of top side stroke', 'dragblock'),
		type: 'border-style'
	},
	'border-right-style': {
		keyword: 'edge border right side stroke line style design dotted dashed solid',
		label: __('Border Right Style', 'dragblock'),
		note: __('Line style or design of right side stroke', 'dragblock'),
		type: 'border-style'
	},
	'border-bottom-style': {
		keyword: 'edge border bottom side stroke line style design dotted dashed solid',
		label: __('Border Bottom Style', 'dragblock'),
		note: __('Line style or design of bottom side stroke', 'dragblock'),
		type: 'border-style'
	},
	'border-left-style': {
		keyword: 'edge border left side stroke line style design dotted dashed solid',
		label: __('Border Left Style', 'dragblock'),
		note: __('Line style or design of left side stroke', 'dragblock'),
		type: 'border-style'
	},


	// - BORDER RADIUS
	'border-radius': {
		keyword: 'border edge stroke radius round corner circular elliptical ',
		label: __('Border Radius', 'dragblock'),
		note: __('Rounds the corners', 'dragblock'),
		type: 'unit'
	},
	'border-top-left-radius': {
		keyword: 'top left border edge stroke radius round corner circular elliptical ',
		label: __('Border Top Left Radius', 'dragblock'),
		note: __('Rounds the top left corner', 'dragblock'),
		type: 'unit'
	},
	'border-top-right-radius': {
		keyword: 'top right border edge stroke radius round corner circular elliptical ',
		label: __('Border Top Right Radius', 'dragblock'),
		note: __('Rounds the top right corner', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-right-radius': {
		keyword: 'bottom right border edge stroke radius round corner circular elliptical ',
		label: __('Border Bottom Right Radius', 'dragblock'),
		note: __('Rounds the bottom right corner', 'dragblock'),
		type: 'unit'
	},
	'border-bottom-left-radius': {
		keyword: 'bottom left border edge stroke radius round corner circular elliptical ',
		label: __('Border Bottom Left Radius', 'dragblock'),
		note: __('Rounds the bottom left corner', 'dragblock'),
		type: 'unit'
	},



	// SPACING
	// -------------------
	// - MARGIN
	'margin': {
		keyword: 'margin outer gap width size all sides',
		label: __('Margin', 'dragblock'),
		note: __('Outer gaps from surrounded neighbors', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-top': {
		keyword: 'margin top side outer gap width size',
		label: __('Margin Top', 'dragblock'),
		note: __('Outer gap from top neighbor', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-right': {
		keyword: 'margin right side outer gap width size',
		label: __('Margin Right', 'dragblock'),
		note: __('Outer gap from right neighbor', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-bottom': {
		keyword: 'margin bottom side outer gap width size',
		label: __('Margin Bottom', 'dragblock'),
		note: __('Outer gap from bottom neighbor', 'dragblock'),
		type: 'margin' // could set a negative value
	},
	'margin-left': {
		keyword: 'margin left side outer gap width size',
		label: __('Margin Left', 'dragblock'),
		note: __('Outer gap from left neighbor', 'dragblock'),
		type: 'margin' // could set a negative value
	},


	// - PADDING
	'padding': {
		keyword: 'padding inner gap width size',
		label: __('Padding', 'dragblock'),
		note: __('Inner gap between content and edges', 'dragblock'),
		type: 'unit'
	},
	'padding-top': {
		keyword: 'padding top side inner gap width size',
		label: __('Padding Top', 'dragblock'),
		note: __('Inner gap between content and top edge', 'dragblock'),
		type: 'unit'
	},
	'padding-right': {
		keyword: 'padding right side inner gap width size',
		label: __('Padding Right', 'dragblock'),
		note: __('Inner gap between content and right edge', 'dragblock'),
		type: 'unit'
	},
	'padding-bottom': {
		keyword: 'padding bottom side inner gap width size',
		label: __('Padding Bottom', 'dragblock'),
		note: __('Inner gap between content and bottom edge', 'dragblock'),
		type: 'unit'
	},
	'padding-left': {
		keyword: 'padding left side inner gap width size',
		label: __('Padding Left', 'dragblock'),
		note: __('Inner gap between content and left edge', 'dragblock'),
		type: 'unit'
	},

	// - EFFECT
	'box-shadow': {
		keyword: 'box shadow',
		label: __('Box Shadow', 'dragblock'),
		note: __('Set shadow effects arround the block', 'dragblock'),
		type: 'box-shadow'
	},
	'text-shadow': {
		keyword: 'text shadow',
		label: __('Text Shadow', 'dragblock'),
		note: __('Add shadows to text', 'dragblock'),
		type: 'text-shadow'
	},

	// POSITION
	'z-index': {
		keyword: 'index layer order z- position overlap zindex zorder',
		label: __('Z-index', 'dragblock'),
		note: __('Set position order by overlapping element layers', 'dragblock'),
		type: 'number'
	},
	'overflow': {
		keyword: 'overflow hidden scroll',
		label: __('Overflow', 'dragblock'),
		note: __('Set position order by overlapping element layers', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'hidden', label: __('Hidden', 'dragblock') },
			{ value: 'scroll', label: __('Scroll', 'dragblock') },			
			{ value: 'visible', label: __('Visible', 'dragblock') },			
		]
	},
	'position': {
		keyword: 'positioned location elements',
		label: __('Position', 'dragblock'),
		note: __('location of positioned elements', 'dragblock'),
		type: 'position'
	},

	'top': {
		keyword: 'top vertical positioned elements',
		label: __('Top', 'dragblock'),
		note: __('Specifying top vertical location of positioned elements', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -1000, max: 1000, step: 1, default: 0
			}
		}
	},
	'bottom': {
		keyword: 'bottom vertical positioned elements',
		label: __('Bottom', 'dragblock'),
		note: __('Specifying bottom vertical location of positioned elements', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -1000, max: 1000, step: 1, default: 0
			}
		}
	},
	'left': {
		keyword: 'left vertical positioned elements',
		label: __('Left', 'dragblock'),
		note: __('Specifying left vertical location of positioned elements', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -1000, max: 1000, step: 1, default: 0
			}
		}
	},
	'right': {
		keyword: 'right vertical positioned elements',
		label: __('Right', 'dragblock'),
		note: __('Specifying right vertical location of positioned elements', 'dragblock'),
		type: 'unit',
		units: {
			px: {
				value: 'px', label: 'px', min: -1000, max: 1000, step: 1, default: 0
			}
		}
	},

	// display
	'display': {
		keyword: 'index layer order z- position overlap zindex zorder',
		label: __('Display', 'dragblock'),
		note: __('Set position order by overlapping element layers', 'dragblock'),
		type: 'display'
	},
	'tranlate': {
		keyword: 'translate axis position elements coordinates 3D 3-directions',
		label: __('Translate', 'dragblock'),
		note: __('Set position of elements in 3D', 'dragblock'),
		type: 'translate'
	},
	'transform': {
		keyword: 'transform matrix matrix3d perspective rotate rotate3d rotateX rotateY rotateZ translate translate3d translateX translateY translateZ scale scale3d scaleX scaleY scaleZ skew skewX skewY',
		label: __('Transform', 'dragblock'),
		note: __('Rotate, scale, skew, or translate elements in coordinate space', 'dragblock'),
		type: 'transform'
	},

	// Flex: flex-direction
	'align-items': {
		keyword: 'align items vertical position',
		label: __('Align Items', 'dragblock'),
		note: __('Vertical position of elements', 'dragblock'),
		type: 'align-items'
	},
	'justify-content': {
		keyword: 'justify content distribute space horizontal align',
		label: __('Justify Content', 'dragblock'),
		note: __('Distributes space horizontally between items', 'dragblock'),
		type: 'justify-content'
	},

	'flex-wrap': {
		keyword: 'wrap flex items multiple lines single lines',
		label: __('Flex Wrap', 'dragblock'),
		note: __('Wrap flex items multiple lines or single lines', 'dragblock'),
		type: 'flex-wrap'
	},

	'flex-direction': {
		keyword: 'flex direction place row column',
		label: __('Flex Direction', 'dragblock'),
		note: __('Place flex items on rows or columns', 'dragblock'),
		type: 'flex-direction'
	},
	'flex-grow': {
		keyword: 'flex grow sizes ratio items',
		label: __('Flex Grow', 'dragblock'),
		note: __('The ratio of sizes of flex items', 'dragblock'),
		type: 'number'
	},
	'flex-shrink': {
		keyword: 'flex shrink sizes ratio items',
		label: __('Flex Shrink', 'dragblock'),
		note: __('The ratio of sizes of flex items', 'dragblock'),
		type: 'number'
	},
	'flex-basis': {
		keyword: 'flex basis item size width height ',
		label: __('Flex Basis', 'dragblock'),
		note: __('Flex item size/width/height', 'dragblock'),
		type: 'width'
	},
	'row-gap': {
		keyword: 'row vertical gap size gutter',
		label: __('Row Gap', 'dragblock'),
		note: __('Size of veritical gaps / gutters between flex items in rows'),
		type: 'unit'
	},
	'column-gap': {
		keyword: 'column horizontal gap size gutter',
		label: __('Column Gap', 'dragblock'),
		note: __('Size of horizontal gaps / gutters between flex items in columns'),
		type: 'unit'
	},
	// 'gap' : {
	// 	keyword: 'vertical horizontal gap size gutter',
	// 	label: __('Gap', 'dragblock'),
	// 	note: __('Size of horizontal and vertical gaps / gutters between flex items in columns and rows'),
	// 	type: 'unit'
	// },

	// Grid
	'grid-template-columns': {
		keyword: 'grid template columns',
		label: __('Grid Template Columns', 'dragblock'),
		note: __('Grid template columns', 'dragblock'),
		type: 'text'
	},
	'grid-template-rows': {
		keyword: 'grid template rows',
		label: __('Grid Template Rows', 'dragblock'),
		note: __('Grid template rows', 'dragblock'),
		type: 'text'
	},
	'grid-auto-flow': {
		keyword: 'grid auto flow',
		label: __('Grid Auto Flow', 'dragblock'),
		note: __('Grid auto flow', 'dragblock'),
		type: 'text'
	},
	'grid-column': {
		keyword: 'grid column',
		label: __('Grid Column', 'dragblock'),
		note: __('Grid Column', 'dragblock'),
		type: 'text'
	},
	'grid-row': {
		keyword: 'grid row',
		label: __('Grid Row', 'dragblock'),
		note: __('Grid Row', 'dragblock'),
		type: 'text'
	},
	'grid-area': {
		keyword: 'grid area',
		label: __('Grid Area', 'dragblock'),
		note: __('Grid Area', 'dragblock'),
		type: 'text'
	},
	'align-self': {
		keyword: 'align-self',
		label: __('Align Self', 'dragblock'),
		note: __('Align Self', 'dragblock'),
		type: 'text'
	},
	'justify-self': {
		keyword: 'justify-self',
		label: __('Justify Self', 'dragblock'),
		note: __('Justify Self', 'dragblock'),
		type: 'text'
	},


	'background-image': {
		keyword: 'background image',
		label: __('Background Image', 'dragblock'),
		note: __('SRC for background Image', 'dragblock'),
		type: 'text'
	},

	'background-size': {
		keyword: 'background size',
		label: __('Background Size', 'dragblock'),
		note: __('Size of background image'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'cover', label: __('Cover', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'auto', label: __('Auto', 'dragblock') },
		]
	},

	'background-position-x': {
		keyword: 'background position x',
		label: __('Background Position X', 'dragblock'),
		note: __('Position of background image on X axis', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'left', label: __('Left', 'dragblock') },
			{ value: 'center', label: __('Center', 'dragblock') },
			{ value: 'right', label: __('Right', 'dragblock') },
		]
	},
	'background-position-y': {
		keyword: 'background position y',
		label: __('Background Position Y', 'dragblock'),
		note: __('Position of background image on Y axis', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'top', label: __('Left', 'dragblock') },
			{ value: 'center', label: __('Center', 'dragblock') },
			{ value: 'bottom', label: __('Right', 'dragblock') },
		]
	},

	'background-repeat': {
		keyword: 'background repeat',
		label: __('Background Repeat', 'dragblock'),
		note: __('Repeatition of background image', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'no-repeat', label: __('No Repeat', 'dragblock') },
			{ value: 'space', label: __('Space', 'dragblock') },
			{ value: 'repeat-x', label: __('Repeat X', 'dragblock') },
			{ value: 'repeat-y', label: __('Repeat Y', 'dragblock') },
			{ value: 'repeat', label: __('Repeat', 'dragblock') },
			{ value: 'round', label: __('Round', 'dragblock') },
		]
	},
	'user-select': {
		keyword: 'user select',
		label: __('User Select', 'dragblock'),
		note: __('Selection of content', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'none', label: __('None', 'dragblock') },
			{ value: 'text', label: __('Text', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'all', label: __('All', 'dragblock') },
		]
	},
	'cursor': {
		keyword: 'mouse cursor',
		label: __('Cursor', 'dragblock'),
		note: __('Icon of Mouse Cursor', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'pointer', label: __('Pointer', 'dragblock') },
			{ value: 'text', label: __('Text', 'dragblock') },
		]
	},
	'object-fit': {
		keyword: 'object fit',
		label: __('Object Fit', 'dragblock'),
		note: __('Way to fit content in containers', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'cover', label: __('Cover', 'dragblock') },
			{ value: 'contain', label: __('Contain', 'dragblock') },
			{ value: 'fill', label: __('Fill', 'dragblock') },
			{ value: 'none', label: __('None', 'dragblock') },
		]
	},
	'zoom': {
		keyword: 'zoom',
		label: __('Zoom', 'dragblock'),
		note: __('Scale element layout size', 'dragblock'),
		type: 'number',
		min: 0,
		max: 10,
		step: 0.1
	},
	'resize': {
		keyword: 'resize',
		label: __('Resize', 'dragblock'),
		note: __('Direction for resizing', 'dragblock'),
		type: 'select',
		options: [
			{ value: '', label: __('Default', 'dragblock') },
			{ value: 'horizontal', label: __('Horizontal', 'dragblock') },
			{ value: 'vertical', label: __('Vertical', 'dragblock') },
		]
	},
	'animation-name': {
		keyword: 'animation name',
		label: __('Animation name', 'dragblock'),
		note: __('Defined animation name', 'dragblock'),
		type: 'animation-name'
	},
	'animation-duration': {
		keyword: 'animation duration',
		label: __('Animation Duration', 'dragblock'),
		note: __('Time period for Animation', 'dragblock'),
		type: 'unit',
		units: [
			{
				value: 's',
				label: __('s', 'dragblock'),
				min: 1,
				max: 10,
				step: 1,
				default: 1

			},
			{
				value: 'ms',
				label: __('ms', 'dragblock'),
				min: 50,
				max: 1000,
				step: 10,
				default: 200

			},
		]
	},


}



/**
 * @info register custom attributes and supports features
 */
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'dragblock/appearance-register',
	function (settings, name) {

		// for all blocks        
		settings = Object.assign({}, settings, {
			// override the attributes in the block.json files
			attributes: Object.assign({}, settings.attributes, {
				/**
				 * @hack WordPress does not let us save object attributes normally
				 * so we have assign empty string as the default to trigger the save function
				 * https://github.com/WordPress/gutenberg/issues/37967
				 */
				// will use inline styles for styling                
				/*
				dragBlockStyles: [
					{
						slug: 'background-color', 
						value: '',
						selector: '',
						states: 'haf', // hover, active, focus
						parent-selector: '',
						parent-states: '',
						devices: 'dtm', // desktop, tablet, mobile
						disabled: '' // f = disabled on front-end, b = disabled on back-end, * = disabled on all
					},
				]
				*/

				dragBlockStyles: { type: 'array', default: '' },
				dragBlockCSS: { type: 'string', default: '' },
			}),
		});

		// for DragBlockblocks
		// if ((name.indexOf('dragblock') != -1)) {
		// 	settings = Object.assign( {}, settings, {
		// 		// override the attributes in the block.json files
		// 		attributes: Object.assign( {}, settings.attributes, {					
		// 		} ),
		// 	} );
		// }

		// for certain blocks 
		// if (name == 'dragblock/wraper') {
		// 	settings = Object.assign( {}, settings, {
		// 		// override the attributes in the block.json files
		// 		attributes: Object.assign( {}, settings.attributes, {
		// 		} ),
		// 	} );
		// }
		return settings;
	}
);


