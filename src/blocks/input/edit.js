import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import './editor.scss';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { getAttr } from '../../applications/back/attributes/attributes-settings';
import { dragBlockQueryShortcodes } from '../../library/ultils/shortcodes';
import { cloneDeep } from 'lodash';
/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function Edit(props) {

    const { attributes, setAttributes, isSelected, clientId } = props;
    let { dragBlockAttrs, dragBlockClientId } = attributes;
    // default attributes for input
    if (!dragBlockAttrs) {
        const newAttr = [
            { slug: 'name', value: dragBlockClientId ? dragBlockClientId : clientId },
            { slug: 'type', value: 'text' },
            {
                slug: 'placeholder', value: 'Input a text', locale: 'en_US'
            }
        ];
        setAttributes({ dragBlockAttrs: cloneDeep(newAttr) });
        dragBlockAttrs = newAttr;
    }

    let blockProps = useBlockProps();
    return (

        <input {...blockProps} />

    );
}
