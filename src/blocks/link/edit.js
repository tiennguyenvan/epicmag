import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InnerBlocks, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';

import './editor.scss';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function Edit(props) {
	const {
		attributes,
		setAttributes,
		clientId,
	} = props;

	const allow_blocks = ['dragblock/text', 'dragblock/icon', 'dragblock/image'];
	const template = [
		['dragblock/text', { dragBlockText: {'en_US': 'Click Here'} }],
		['dragblock/icon', {
			iconName: 'wordpress-chevronRight'
		}
		],
	]
	// this returns an array of clientIds of children
	const innerBlockIds = useSelect(select => { return select('core/block-editor').getBlockOrder(clientId); });
	const blockProps = useBlockProps();
	// const innerBlocksProps = useInnerBlocksProps( useBlockProps() );
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: [...allow_blocks],
			template: [
				['dragblock/text', {  }],
				['dragblock/icon', {
					iconName: 'wordpress-chevronRight'
				}
				],
			],
			orientation: "horizontal",
		}
	);
	// const inner = <InnerBlocks orientation="horizontal" allowedBlocks={ allow_blocks } template={template} renderAppender={ InnerBlocks.ButtonBlockAppender }/>
	return <a {...innerBlocksProps} data-content-length={innerBlockIds.length} />
}
