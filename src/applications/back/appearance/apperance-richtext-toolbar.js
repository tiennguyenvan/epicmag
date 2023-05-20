import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
import {
	InspectorAdvancedControls,
	InspectorControls,
	useSetting,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	BlockControls,
	JustifyToolbar,

} from '@wordpress/block-editor'

import {
	ToggleControl,
	PanelBody,
	SearchControl,
	ColorPicker,
	ColorPalette,
	Tooltip,
	Popover,
	Autocomplete,
	Button,
	ButtonGroup,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components'

import DimensionControl from '../../../library/components/dimension-control';
import FontSizeControl from '../../../library/components/font-size-control';
import FontWeightControl from '../../../library/components/font-weight-control';
import LineHeightControl from '../../../library/components/line-height-control';
import TextDecorationControl from '../../../library/components/text-decoration-control';
import TextDecorationLineControl from '../../../library/components/text-decoration-line-control';
import TextDecorationStyleControl from '../../../library/components/text-decoration-style-control';
import TextTransformControl from '../../../library/components/text-transform-control';
import BorderStyleControl from '../../../library/components/border-style-control';
import BorderControl from '../../../library/components/border-control';
import TextShadowControl from '../../../library/components/text-shadow-control';
import BoxShadowControl from '../../../library/components/box-shadow-control';
import PositionControl from '../../../library/components/position-control';
import DisplayControl from '../../../library/components/display-control';

import {
	dragBlockMatchingColors,
	dragBlockMatchingBorderColors,
	dragBlockUnmatchingColors,
	dragBlockUnmatchingBorderColors,
	invertColor
} from '../../../library/ultils/styling';

import {
	dragBlockAppearanceStyle
} from './appearance-style';
import { TextControl } from '@wordpress/components';
import { Flex } from '@wordpress/components';
import { FlexItem } from '@wordpress/components';
import TranslateControl from '../../../library/components/translate-control';
import TransformControl from '../../../library/components/transform-control';
import AlignItemsControl from '../../../library/components/align-items-control';
import JustifyContentControl from '../../../library/components/justify-content-control';
import FlexWrapControl from '../../../library/components/flex-wrap-control';
import FlexDirectionControl from '../../../library/components/flex-direction-control';
import MarginControl from '../../../library/components/margin-control';
import TextAlignControl from '../../../library/components/text-align-control';
import {
	flipHorizontal as flipH,
	flipVertical as flipV,
	link,
	rotateRight,
	wordpress,
} from '@wordpress/icons';

import { Dropdown } from '@wordpress/components';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { iconShortcode, dragBlockIcons } from '../../../library/icons/icons';
import { insert, editor, getActiveObject, getTextContent, insertObject, create, replace, toHTMLString, applyFormat } from '@wordpress/rich-text';
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import PopoverProperty from '../../../library/components/popover-property';
import AutocompleteSearchBox from '../../../library/components/autocomplete-search-box';
import { dragBlockQueryShortcodes } from '../../../library/ultils/shortcodes';


const dragBlockRichtextIconInserter = (props) => {

	const { isActive, onChange, value } = props;
	const [searchingIconQuery, setSearchingIconQuery] = useState('')
	const [searchResultIcons, setSearchResultIcons] = useState([])


	return (
		<>
			<BlockControls>
				<ToolbarGroup>

					{/* <Dropdown						
					renderToggle={ ( { onToggle } ) => (
						<ToolbarButton onClick={ onToggle }>
							{ wordpress }
						</ToolbarButton>
					) }
					renderContent={ ( { onClose } ) => (
						<>							
							<SearchControl
								value={searchingIconQuery}
								placeholder={__('Find an icon', 'dragblock')}
								onChange={(value) => {
									setSearchingIconQuery(value);
									
									let searchWords = value.toLowerCase().trim().replace(/-/gi, ' ').split(' ').map(e=>e.trim());
									let searchWordsM = searchWords.join('').replace(/ /gi, '');
									// console.log(searchWords);
									let results = [];
									for (let icon of dragBlockIcons) {
										let q = icon.keywords + icon.title.toLowerCase();
										let qm = q.replace(/ /gi, '').replace(/-/gi, '');
										let match = true;
										if (qm.indexOf(searchWordsM) == -1) {
											for (let word of searchWords) {
												if (q.indexOf(word) === -1) {
													match = false
													break;
												}
											}
										}
										
										if (match) {
											results.push(icon.icon);
										}
									}
									setSearchResultIcons([...results])
								}}
							/>
							<div className='dragblock-richtext-icon-inserter-results'>
								{searchResultIcons.length === 0 ? (
									__('Found no icon matched!', 'dragblock')
								) : (

									searchResultIcons.map(e=>
										<a 
											onClick={()=>{
												onClose(true)
												
												onChange(insert(value, create({'html' : renderToStaticMarkup(
													
													<span className='dragblock-icon'>
														{e}
													</span>
													
												)})))
											
											}} 
											className='dragblock-icon'>{e}
										</a>
									)
								)}
							</div>
						</>
					) }
				>
				</Dropdown> */}

				</ToolbarGroup>
			</BlockControls>

		</>
	);
};

registerFormatType('dragblock/richtext-icon-inserter', {
	title: 'Insert Icon',
	tagName: 'span',
	className: 'dragblock-icon',
	edit: dragBlockRichtextIconInserter,
});






/**
 * 
 * @param {*} props 
 * @returns 
 */
const dragBlockShortcodes = {
	'current.post.title': {
		note: __('Custom get post loops need to be parsed to use this', 'dragblock'),
		label: __('Current Post Title'),
	}
}


const dragBlockRichtextShortCodeInserter = (props) => {

	const { isActive, onChange, value } = props;

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<AutocompleteSearchBox
						note={__('Shortcodes', 'dragblock')}
						className='dragblock-insert-shortcodes-box'
						placeholder={__('Search a shortcode')}
						icon={iconShortcode}
						label={__('Insert a shortcode')}
						showTrigger={true}
						onSelect={(slug) => {														
							const newContent = wp.richText.insert(value, slug, value.start);
							onChange(newContent);
						}}

						suggestions={dragBlockQueryShortcodes}
					/>
				</ToolbarGroup>
			</BlockControls>

		</>
	);
};

registerFormatType('dragblock/richtext-shortcode-inserter', {
	title: 'Insert Icon',
	tagName: 'span',
	className: 'dragblock-shortcode',
	edit: dragBlockRichtextShortCodeInserter,
});