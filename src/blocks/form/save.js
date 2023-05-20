import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks'

/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function save(props) {		
	const {attributes} = props;	
	let blockProps = useBlockProps.save();
	// blockProps = applyFilters('dragblock-blockProps', {blockProps, props})
	return (
		<form {...blockProps}>			
				<InnerBlocks.Content />			
		</form>
	);
}
