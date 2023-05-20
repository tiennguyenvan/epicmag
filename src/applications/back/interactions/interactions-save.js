
/**
 * @info Modify the save codes of the blocks
 */

import { useBlockProps } from "@wordpress/block-editor/build/components";

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'dragblock/interactions-save',
	function (extraProps, blockType, attributes) {
		// for all blocks
		const { dragBlockScripts } = attributes;

		// parse scripts here to add to HTML attributes
		if (dragBlockScripts) {
			for (let script of dragBlockScripts) {

			}
		}
		return extraProps;
	}
);


