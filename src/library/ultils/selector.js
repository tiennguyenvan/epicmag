export const wpSystemNativeClasses = {
    'core/search' : [
        'wp-block-search',
        'wp-block-search__button-outside',
        'wp-block-search__text-button',        
        'wp-block-search__label',
        'wp-block-search__inside-wrapper',
        'wp-block-search__input',
        'wp-block-search__button'
    ],
    'dragblock/form' : [
        'dragblock-form',
        'dragblock-form-success',
        'dragblock-form-error',
    ],

    'core/navigation': [
        'wp-block-navigation',
        'wp-block-navigation__container',
        'wp-block-navigation-link',
        'wp-block-navigation-link__content',
        'wp-block-navigation-link__label',
        'wp-block-navigation-link__submenu-icon',
        'wp-block-navigation-item',
        'wp-block-navigation-item__label',
        'wp-block-navigation-item__description',
        'wp-block-navigation-item__content',
        'wp-block-navigation__submenu-container',
        'wp-block-navigation__submenu-icon',
        'wp-block-navigation-submenu__toggle',
        'wp-block-navigation-submenu',
        'wp-block-navigation__responsive-close',
        'wp-block-navigation__responsive-container',
        'wp-block-navigation__responsive-container-content',
        'wp-block-navigation__responsive-dialog',
        'wp-block-navigation__responsive-container-close',
        'wp-block-navigation__responsive-container-open',
        'wp-block-navigation__toggle_button_label',
    ],

    'core/query': [
        'wp-block-post-comments',
        'wp-block-post-author',
        'wp-block-post-author__byline',
        'wp-block-post-author__avatar',
        'wp-block-post-author__bio',
        'wp-block-post-author__content',
        'wp-block-post-author__name',
        'wp-block-post-comments-form',
        'wp-block-post-date',
        'wp-block-post-excerpt',
        'wp-block-post-excerpt__excerpt',
        'wp-block-post-excerpt__more-text',
        'wp-block-post-excerpt__more-link',
        'wp-block-post-featured-image',
        'wp-block-post-featured-image__overlay',
        'wp-block-post-navigation-link',
        'wp-block-post-navigation-link__arrow-previous',
        'wp-block-post-navigation-link__arrow-next',
        'wp-block-post-terms',
        'wp-block-post-terms__separator',
        'wp-block-post-title',
        'wp-block-post-template'
    ]
}

export function getClassList() {
    let list = {};
    let classes = Object.values(window['dragBlockSelectorSuggestions']['classes']).join(' ').split(' ');
    for (let cl of classes) {
        list[cl] = cl
    }

    return list;
}

export function getIdList() {
    let list = {};
    let ids = Object.values(window['dragBlockSelectorSuggestions']['ids']).join(' ').split(' ');
    for (let id of ids) {
        list[id] = id
    }

    return list;
}

export function getSelectors() {
    let selector = new Object();
    
    let classes = Object.values(window['dragBlockSelectorSuggestions']['classes']).join(' ')
    
    if (classes) {
        classes = classes.split(' ');
        for (let cl of classes) {
            selector['.' + cl] = '.' + cl;
        }
    }
    
    let ids = Object.values(window['dragBlockSelectorSuggestions']['ids']).join(' ');
    if (ids) {
        ids = ids.split(' ');
        for (let id of ids) {
            selector['#' + id] = '#' + id;
        }
    }

    // let attrs = Object.values(window['dragBlockSelectorSuggestions']['attrs']).join(' ').split(' ');
    // for (let attr of attrs) {
    //     selector['[' + attr + ']'] = '[' + attr + ']';
    // }
    return selector;
}