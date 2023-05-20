auto translator for dragBlock texts
render condition: use to disable/enable the render of a content on the server level (for example, post break pages, login/logout), or to switch between icons

Add global settings to core/site blocks
wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'my-plugin/site-block-attributes',
    function (props, blockType, attributes) {
        if (blockType.name === 'core/site') {
            return Object.assign({}, props, {
                role: 'main',
                'aria-label': 'Main Content'
            });
        }
        return props;
    }
);


Support Printer device
- allow to input start/end to shortcode (ex: post.title) to get only specific words
- add back :active for css properties and add browser condition to prevent :hover effect on mobile devices when active
- Show strikethrough for duplicated properties
- Find a way to add :root for font size so we can use rem unit for our font-size control
	=> This is a must because users usually change fonts without awareness that leads to lots of problems	