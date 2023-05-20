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
	

	const { attributes, setAttributes, isSelected, clientId } = props;
	let { dragBlockText, dragBlockAttrs, dragBlockClientId } = attributes;
	let blockProps = useBlockProps();
	
	// default attributes for textarea
	if (!dragBlockAttrs) {
		const newAttr = [
			{slug: 'name', value: dragBlockClientId ? dragBlockClientId : clientId},
			{slug: 'placeholder', value: 'Input a Text Group', locale: 'en_US' },
		];
		setAttributes({dragBlockAttrs: cloneDeep(newAttr)});
		dragBlockAttrs = newAttr;
	}

	return (
		<>			
			<textarea {...blockProps}/>
		</>
	);
}
