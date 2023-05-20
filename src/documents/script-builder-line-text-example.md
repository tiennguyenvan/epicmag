click
    add .active
    
click
    if is .active
        remove .active
    else 
        add .active
    
[example]
    click .mobile-toggle
        if .mobile-menu is .active 
            remove .active from it
        else 
            add .active to it

    click .mobile-toggle
        toggle .active of .mobile-menu

    click .cta-button
        add .active to .sell-book-modal

    escape on DOC or click .sell-book-modal-close or click .sell-book-modal-overlay
        remove .active from .sell-book-modal

    click _this
        increase dragBlockDB.page of parent


click .example
    do [example]

ctrl+click .example
    do [example]


escape
    remove .active from .ct-modal-close

escape or click .ct-exit
    remove .active from .ct-modal-close

    





Please create the whole code for a simple code editor COMPONENT in WordPress FSE (react-based). Here is the list of requirements of the editor
1. Code highlighter for two sets of keywords: [click, ctrl+p, ctrl+alt+enter, remove, increase, add] and [if, else, is]
2. Code indentation: for example,
    if is .active
        remove .active
    else 
        add .active
3. Code autocompletion: for example, when user focus the code editor, if the content is empty or they type "c", we show a list of suggestions:
    - click
    - ctrl

After highlighting, the text cursor should stay at the same position as the cursor when the user edits the code.
Please take advantage from '@wordpress' and 'react' libraries.



