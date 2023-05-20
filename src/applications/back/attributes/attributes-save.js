
/**
 * @info Modify the save codes of the blocks
 */

import { useBlockProps } from "@wordpress/block-editor/build/components";

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'dragblock/attributes-save',
	function (extraProps, blockType, attributes) {
        // for all blocks
        const { dragBlockClientId, anchor, dragBlockAttrs, dragBlockAttrHref, dragBlockAttrTarget, dragBlockAttrRel } = attributes;

        if (dragBlockClientId) {
            extraProps['data-dragBlock-client-id'] = dragBlockClientId;
        }
		// for dragblock		
		if (anchor) {
			extraProps['id'] = anchor;
		}

		if (dragBlockAttrs) {
			for (let attr of dragBlockAttrs) {

				// this is a multilingual attribute
				if (typeof(attr['value']) !== 'string') {
					continue
				}
				// @note: please check if we need to enable this to avoid collisions
				// to other plugins that are setting the same attribute
				// if (extraProps[attr['slug']]) continue;

				if (attr['disabled']) continue;

				extraProps[attr['slug']] = attr['value'];
			}			
		}

		// if (blockType.name.indexOf('dragblock/link') != -1) {
		// 	console.log('Save', extraProps, blockType, attributes, blockProps);
		// }

        // const { hideOnMobile } = attributes;
     
        // if (typeof hideOnMobile !== 'undefined' && hideOnMobile) {
        //     extraProps.className = extraProps.className + ' hide-on-mobile';
        // }
        return extraProps;
    }
);