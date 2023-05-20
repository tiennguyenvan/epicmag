import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import './editor.scss';
import { TextControl } from '@wordpress/components';
import { cloneDeep, isEmpty } from 'lodash';
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
	

	const { attributes, setAttributes, isSelected } = props;
	let { dragBlockText, dragBlockAttrs } = attributes;
	let blockProps = useBlockProps();
	
	if (!dragBlockText) {
		dragBlockText = {}
	}
	if (!dragBlockText[DRAG_BLOCK_SITE_LOCALE]) {
		dragBlockText[DRAG_BLOCK_SITE_LOCALE] = '';
	}

	if (!dragBlockAttrs) {
        const newAttr = [
            { slug: 'value', value: '' },
        ];
        setAttributes({ dragBlockAttrs: cloneDeep(newAttr) });
        dragBlockAttrs = newAttr;
    }
	
	return (
		<>
			{/* { applyFilters('dragblock-controls', {blockProps, props}) }			 */}
			<option {...blockProps}>
			{dragBlockText[DRAG_BLOCK_SITE_LOCALE]}
			</option>
		</>
	);
}
