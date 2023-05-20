import { useBlockProps, RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function save(props) {	
	let blockProps = useBlockProps.save();
    return (			
		<textarea { ...blockProps }/>
	)
}
