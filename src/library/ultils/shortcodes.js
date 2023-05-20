import { __ } from '@wordpress/i18n';

export const dragBlockQueryShortcodes = {
    // form shortcodes
    '[dragblock.form.message.error]' : {
        label: __('Form Submission Error Message', 'dragblock'),
        note: __('Show the error message if have after a form is submitted', 'dragblock'),
        placeholder: __('DragBlockForm Error: There is an uknown server error.', 'dragblock')
    },

    // current post shortcode
    '[dragblock.post.title]': {
        label: __('Post Title', 'dragblock'),
        note: __('The parsed post\'s Title', 'dragblock'),
        placeholder: __('The DragBlockPost Title Shortcode', 'dragblock')
    },
    '[dragblock.post.link]': {
        label: __('Post Link', 'dragblock'),
        note: __('The parsed post\'s href', 'dragblock'),
    },
    '[dragblock.post.thumbnail.src]': {
        label: __('Post Thumnnail SRC', 'dragblock'),
        note: __('the parsed post\'s thumbnail src', 'dragblock'),
    },
    '[dragblock.post.author.link]': {
        label: __('Post Author Link', 'dragblock'),
        note: __('the parsed post\'s author page href', 'dragblock'),
    },
    '[dragblock.post.author.name]': {
        label: __('Post Author Name', 'dragblock'),
        note: __('The parsed post\'s author name', 'dragblock'),
        placeholder: __('Author Name', 'dragblock')
    },
    '[dragblock.post.author.avatar.src]': {
        label: __('Post Author Avatar SRC', 'dragblock'),
        note: __('The parsed post\'s author\'s avatar SRC', 'dragblock'),
    },
    // allow to input format attributes, ex: format="friendly"
    '[dragblock.post.date]': {
        label: __('Post Date Name', 'dragblock'),
        note: __('The parsed post\'s date', 'dragblock'),
        placeholder: __('July 01, 2050', 'dragblock')
    },    

    '[dragblock.post.comment.count]': {
        label: __('Post Comment Count', 'dragblock'),
        note: __('The parsed post\'s comment number', 'dragblock'),
        placeholder: '0'
    },
    '[dragblock.post.snippet]' : {
        label: __('Post Snippet', 'dragblock'),
        note: __('The parsed post\'s snippet', 'dragblock'),
        placeholder: __('Get the first paragraph of the post content. If the post excerpt, a custom summary of the post that author manually inputted when composing the post content, exists, use that instead', 'dragblock')
    },
    
    // allow to input index attributes to get the right category/tag
    '[dragblock.post.cat.name]': {
        label: __('Post Category Name', 'dragblock'),
        placeholder: __('Category Name', 'dragblock'),
        note: __('index="first/last/root/leaf/most/least"', 'dragblock')
    },
    '[dragblock.post.cat.link]': {
        label: __('Post Category Link', 'dragblock'),        
        note: __('index="first/last/root/leaf/most/least"', 'dragblock')
    },

    '[dragblock.post.tag.name]': {
        label: __('Post Tag Name', 'dragblock'),
        placeholder: __('Tag Name', 'dragblock'),
        note: __('index="first/last/root/leaf/most/least"', 'dragblock')
    },
    '[dragblock.post.tag.link]': {
        label: __('Post Tag Link', 'dragblock'),        
        note: __('index="first/last/root/leaf/most/least"', 'dragblock')
    },
}