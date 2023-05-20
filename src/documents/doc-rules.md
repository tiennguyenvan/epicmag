################################################################
Design/Development Rules
################################################################
- we decided to use dragBlock as a prefix for block attributes because if we use only 'drag' that could be confusing with the drag feature of block. We cannot use 'db' also because that could be confusing with 'database' attribute
- The visual scripting should be very simple, and intuitive so designers could use and the tool should be a shortcut to do things, not about showing full JS code like the real code under it.
- We let theme decide which settings and styles to use so they can create their own value. DragBlock should adapt to the theme's settings. Ex: if we allow to set appearanceTools -> Typography -> Font Family, then DragBlock should enqueue all common font families; otherwise, it should not. 
- But we need to think about reducing the common settings that are usually similar to all themes so theme authors could save time.
- Avoid as much as possible to set default front-end css so users can edit any styles they want
- Avoid as much as possible to apply properties for each separated item
- All toolbar buttons should stay in general files (for ex, placing in appearance-toolbar.js) so we can enable / disable buttons for certain blocks easily
- Patterns will be kit collections. Every pattern has {original-name}-{kit-name}-{purpose-name}
- We provide CSS properties for each block so we can inject them via patterns