import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import './editor.scss';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { getAttr } from '../../applications/back/attributes/attributes-settings';
import { dragBlockQueryShortcodes } from '../../library/ultils/shortcodes';
/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function Edit(props) {

    const { attributes, setAttributes, isSelected } = props;
    const { dragBlockAttrs } = attributes;


    // check if src is set;
    let setSRC = getAttr(dragBlockAttrs, 'src');


    let blockProps = useBlockProps();

    if (!setSRC) {
        blockProps['src'] = DRAG_BLOCK_BLANK_DEMO_IMG;
    } else {

        if (setSRC.indexOf('[') !== -1 && setSRC.indexOf(']') !== -1) {
            for (let shortcode in dragBlockQueryShortcodes) {
                let sc = dragBlockQueryShortcodes[shortcode];
                if (sc['placeholder']) {
                    setSRC = setSRC.replaceAll(shortcode, sc['placeholder'])
                } else {
                    setSRC = setSRC.replaceAll(shortcode, DRAG_BLOCK_BLANK_DEMO_IMG);
                }
            }
        }
        blockProps['src'] = setSRC;
    }

    if (!isSelected) {
        /// 
    }

    return (

        <img {...blockProps} />

    );
}
