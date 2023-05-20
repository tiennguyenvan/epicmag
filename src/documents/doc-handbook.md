################################################################
Handbook
################################################################

- editor.BlockEdit
    Used to modify the block’s edit component. It receives the original block BlockEdit component and returns a new wrapped component.

- editor.BlockListBlock
    Used to modify the block’s wrapper component containing the block’s edit component and all toolbars. It receives the original BlockListBlock component and returns a new wrapped component.

- Remove inner wrapppers of nested blocks
    https://wordpress.stackexchange.com/questions/390696/innerblocks-breaks-flexbox-and-css-grid-styles
    https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/
    https://make.wordpress.org/core/2021/12/28/take-more-control-over-inner-block-areas-as-a-block-developer/

- Tooltip cannot wrap conponents. You should wrap the components with <div> then wrap again with tooltips
- Flex Box alignment:
	https://stackoverflow.com/questions/34606879/whats-the-difference-between-flex-start-and-baseline
- Custom Controls
	https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
	https://mariecomet.fr/en/2021/12/14/adding-options-controls-existing-gutenberg-block/
- Richtext
	https://wordpress.org/support/topic/update-content-for-a-custom-block-toolbar-button-full-site-editing/#post-16341720
- Other hacks
	https://www.codingem.com/gutenberg-how-to-add-a-block-to-a-selected-block/
- Bug fix:
	Render To String: https://stackoverflow.com/questions/49154914/reactdom-rss-rendertostring-production-error
	SVG not show: 
		https://stackoverflow.com/questions/24961151/svg-wont-show-until-i-edit-the-element-in-chrome-developer-tools
- Get Global Data for PHP
	https://developer.wordpress.org/block-editor/reference-guides/filters/global-styles-filters/

- Check duplicated ID
	https://stackoverflow.com/questions/67667923/how-to-detect-when-a-block-is-duplicated/75351199#75351199

- Nested Blocks and Placeholder
	https://github.com/WordPress/gutenberg/blob/4ef110ca0f1177a720b0d233454bde837ae455a4/packages/block-editor/src/components/inner-blocks/README.md
	https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/	

- Other
	https://wordpress.org/support/topic/innerblocks-with-template-returning-a-block-count-of-zero/

- Theme JSON:
	https://qiita.com/AkiHamano/items/4166dd093e2ba03c57d7