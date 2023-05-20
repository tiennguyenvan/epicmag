import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import './editor.scss';
import { TextControl } from '@wordpress/components';
import { cloneDeep } from 'lodash';
import {
	BlockControls
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import DropdownToolbar from '../../library/components/dropdown-toolbar';
import AutocompleteSearchBox from '../../library/components/autocomplete-search-box';
import { dragBlockLanguages } from '../../library/ultils/lang';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function Edit(props) {
	const [selectedLocale, setSelectedLocale] = useState(DRAG_BLOCK_SITE_LOCALE);

	const { attributes, setAttributes, isSelected } = props;
	let { dragBlockText } = attributes;
	let blockProps = useBlockProps();
	

	// let content = attributes.content;	
	if (!dragBlockText) {
		dragBlockText = []
	}

	let textIndex = -1;
	let textValue = '';	
	for (textIndex = 0; textIndex < dragBlockText.length; textIndex++) {
		let text = dragBlockText[textIndex];
		if (text['disabled']) continue;
		if (text['slug'] === selectedLocale) {			
			break;
		}
	}
	
	if (textIndex >= dragBlockText.length) {
		dragBlockText.unshift({
			slug: selectedLocale,
			value: ''
		});
		textIndex = 0;		
	} else {		
		textValue = dragBlockText[textIndex]['value'];
	}
	

	// unwrap unwanted tags because attrbutes.content are actually the inner HTML of the block
	// so if you use <span class="inner"> then in the next load, that tag will be included into attributes.content
	let startWrapper = '<span class="inner">';
	let startWrapperIndex = textValue.indexOf(startWrapper)
	if (startWrapperIndex === 0) {
		textValue = textValue.substring(startWrapper.length);
		textValue = textValue.substring(0, textValue.length - '</span>'.length);
	}

	// replace placeholder from dragBlockQueryShortcodes
	// if (!isSelected) {
	// 	textValue = textValue.replaceAll('[dragblock.post.title]', 'The DragBlockPost Title Shortcode')
	// }


	// console.log(wp.data.select( 'core/rich-text' ).getFormatTypes());

	return (
		<>
			{/* { applyFilters('dragblock-controls', {blockProps, props}) }			 */}
			<span {...blockProps}>
				<BlockControls>
					<ToolbarGroup>
						<AutocompleteSearchBox
							showTrigger={true}
							label={__('Text for other languages', 'dragblock')}
							className='dragblock-text-language-selector'
							placeholder={dragBlockLanguages[selectedLocale]}
							onSelect={(slug) => {
								setSelectedLocale(slug);
							}}

							suggestions={dragBlockLanguages}
						/>
					</ToolbarGroup>
				</BlockControls>
				{/* The span.inner will be used to be detected for the RichText
				and will be included in the RichText Content
				  */}
				{/* <span className='inner'> */}
				{/* <text> */}
				<RichText
					tagName="span" // The tag here is the element output and editable in the admin
					value={textValue} // Any existing content, either from the database or an attribute default
					allowedFormats={[
						'core/bold',
						'core/code',
						'core/italic',
						'core/image',
						'core/strikethrough',
						'core/underline',
						'core/text-color',
						'core/subscript',
						'core/superscript',
						'core/keyboard',
						// 'core/link',
						'dragblock/richtext-shortcode-inserter',
					]} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(content) => {
						let newText = cloneDeep(dragBlockText);
						newText[textIndex]['value'] = content;
						
						setAttributes({ dragBlockText: newText })
					}} // Store updated content as a block attribute
					placeholder={__('Type a Text', 'dragblock')} // Display this text before any content has been added by the user					
				/>
				{/* </text> */}
				{/* </span> */}
			</span>
		</>
	);
}
