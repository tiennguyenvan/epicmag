import { useBlockProps, RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * 
 * @param {Object} props 
 * @returns 
 */
export default function save(props) {
	const { attributes } = props;
	let { dragBlockText } = attributes;
	let blockProps = useBlockProps.save();
	// blockProps = applyFilters('dragblock-blockProps', {blockProps, props})
	// blockProps = applyFilters('dragblock-blockProps', blockProps, props)

	// // let content = attributes.content;
	// if (!dragBlockText) dragBlockText = { 'en_US': '' }
	// let content = dragBlockText['en_US'];

	// // unwrap unwanted tags because attrbutes.content are actually the inner HTML of the block
	// // so if you use <span class="inner"> then in the next load, that tag will be included into attributes.content
	// let startWrapper = '<span class="inner">';
	// let startWrapperIndex = content.indexOf(startWrapper)
	// if (startWrapperIndex === 0) {
	// 	content = content.substring(startWrapper.length);
	// 	content = content.substring(0, content.length - '</span>'.length);
	// }

	// console.log(attributes.content, content);
	return (
		<span {...blockProps}></span>
	)
}
