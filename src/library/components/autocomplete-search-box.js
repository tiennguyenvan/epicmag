////////////////////////////////////////////////////////////////
// Custom Drop Down Toolbar Component
////////////////////////////////////////////////////////////////      
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import classnames from 'classnames';

import {
    SearchControl, Tooltip,
    Popover, Button
} from '@wordpress/components';

import { iconPlus } from '../icons/icons'
import { updateGlobalQueryObjects } from '../ultils/ajax';




export default function AutocompleteSearchBox({
    placeholder,
    onSelect,
    className,
    icon,
    label,
    text,
    showTrigger,
    /* recommend: 
    suggestions : { 
        'your-slug' : {
            note: 'the note will show as a tooltip when users hover the property. If missing, the lable will be used'
            label: 'which will show as the link text for users to choose. If missing, the slug will be used'
        }
    } 

    suggestions : { 
        slug: label
    }
    if suggestion is in: ['categories', 'tags', 'authors', 'posts'] 
    Request URL: http://localhost/wordpress/epicmag/wp-json/wp/v2/search?search=Drink&per_page=20&type=term&_locale=user
    http://localhost/wordpress/epicmag/wp-json/wp/v2/categories?search=Drinks&per_page=20&_locale=user
    */
    suggestions
}) {
    const [autoSuggestSelected, setAutoSuggestSelected] = useState(0);
    const [autoSearchValue, setAutoSearchValue] = useState('')
    const [autoSearchResults, setAutoSearchResults] = useState({})
    const [showAutoSearchPopover, setShowAutoSearchPopover] = useState(false);
    const [isDoingAjax, setIsDoingAjax] = useState(false);
    const [ajaxResults, setAjaxResults] = useState([]);
    const [typingTimeoutId, setTypingTimeoutId] = useState(null);
    const closeAutoSearchPopover = () => { setShowAutoSearchPopover(false) }
    const openAutoSearchPopover = () => {
        let initResults = {};
        for (let slug in suggestions) {
            if (Object.keys(initResults).length > 10) break;
            initResults[slug] = suggestions[slug]
        }
        setAutoSearchResults(initResults);
        setShowAutoSearchPopover(true)
    }
    const onClick = (slug) => {
        onSelect(slug);
        setAutoSearchResults({})
        setAutoSearchValue('')
        closeAutoSearchPopover()
    }


    let ajaxType = '';
    if (!suggestions) {
        suggestions = {};
    } else if (typeof (suggestions) == 'string') {
        ajaxType = suggestions;

        // parse suggestion from the ajaxResults here
        suggestions = {};
        if (ajaxResults && ajaxResults.length) {
            for (let obj of ajaxResults) {
                suggestions[obj.value] = {
                    label: obj.label,
                    note: obj.note,
                }
            }
        }
    }

    const fetchObject = (query, type) => {
        if (!query || !type) {
            setAjaxResults([]);
            return;
        }


        const searchParams = new URLSearchParams({
            search: query,
            per_page: 10,
            _locale: 'users',
        });

        wp.apiFetch({ path: `/wp/v2/${type}?${searchParams.toString()}` }).then(
            (objects) => {
                
                setAjaxResults(
                    objects.map((obj) => {
                        return ({
                            label: obj['name'],
                            value: obj['id'],
                            note: obj['description']
                        })
                    })
                );
                objects.map((obj) => {
                    suggestions[obj['id']] = {
                        label: obj['name'],
                        note: obj['description'],
                    }
                })

                updateGlobalQueryObjects(type, objects);
                updateSearchResults(query);
                setIsDoingAjax(false);
            }
        ).catch((error) => {
            setIsDoingAjax(false);
            setAjaxResults([]);
        });
    }


    const updateSearchResults = (value) => {
        if (!value || !suggestions || suggestions.length == 0) {
            setAutoSearchResults({});
            return;
        }

        let searchWords = value.toLowerCase().trim().replace(/-/gi, ' ').split(' ').map(e => e.trim());
        let searchWordsM = searchWords.join('').replace(/ /gi, '');

        let results = {};
        let results_len = 0;
        for (let slug in suggestions) {
            let q = typeof (suggestions[slug]) === 'string' ? suggestions[slug].toLowerCase() : Object.values(suggestions[slug]).join(' ').toLowerCase();
            let qm = q.replace(/ /gi, '').replace(/-/gi, '');
            let match = true;
            if (qm.indexOf(searchWordsM) == -1) {
                for (let word of searchWords) {
                    if (q.indexOf(word) === -1) {
                        match = false
                        break;
                    }
                }
            }

            if (match) {
                results[slug] = suggestions[slug];

                if (++results_len >= 10) break;
            }
        }

        setAutoSearchResults(results);
    }

    return (

        <div className={'dragblock-autocomplete-search-box' + (className ? ' ' + className : '')}>
            {
                /*
                We must have this fake field because if we place the search box 
                out of the popover, the focus will be lost after the popover shown
                */
            }
            {(showAutoSearchPopover === false || showTrigger) && (
                <Button
                    icon={icon}
                    iconSize='24'
                    label={label}
                    showTooltip={!!label}
                    
                    className='fake-search-button'
                    variant='secondary'
                    onClick={() => {
                        openAutoSearchPopover();                        
                    }
                    }>
                    {text ? text : (icon ? '' : placeholder)}
                </Button>
            )}
            {/* Show Matched Results from the Search to Add */}
            {
                showAutoSearchPopover ? (
                    <Popover
                        position='bottom center'
                        onFocusOutside={closeAutoSearchPopover}
                        onClose={closeAutoSearchPopover}
                        onMouseLeave={closeAutoSearchPopover}
                        className={classnames('dragblock-autocomplete-search-box-popover', {
                            'show-trigger': showTrigger
                        })}

                    >
                        <SearchControl
                            onKeyDown={(event) => {

                                // up
                                if (event.key === 'ArrowUp') {
                                    if (autoSuggestSelected == 0) setAutoSuggestSelected(Object.keys(autoSearchResults).length - 1)
                                    else setAutoSuggestSelected(autoSuggestSelected - 1)
                                }
                                // down
                                else if (event.key === 'ArrowDown') {
                                    if (autoSuggestSelected >= Object.keys(autoSearchResults).length - 1) setAutoSuggestSelected(0)
                                    else setAutoSuggestSelected(autoSuggestSelected + 1)
                                }
                                else if (event.key == "Enter") {
                                    let keys = Object.keys(autoSearchResults);
                                    if (autoSuggestSelected < 0 || keys.length - 1 < autoSuggestSelected) return;
                                    let slug = keys[autoSuggestSelected]
                                    onClick(slug);
                                    
                                    closeAutoSearchPopover();
                                    
                                }
                            }}
                            placeholder={placeholder}
                            value={autoSearchValue}
                            onChange={(value) => {
                                if (ajaxType) {
                                    setIsDoingAjax(true);
                                    setAutoSearchResults([]);
                                    if (typingTimeoutId) clearTimeout(typingTimeoutId);
                                    setTypingTimeoutId(setTimeout(() => {
                                        fetchObject(value, ajaxType);
                                    }, 1000));
                                } else {
                                    updateSearchResults(value)
                                }
                                setAutoSearchValue(value);
                            }}
                        />

                        {ajaxType && autoSearchValue && (
                            <div className='results'>
                                {isDoingAjax == true ? (
                                    <>
                                        {__('Fetching...', 'dragblock')}
                                    </>

                                ) : (<>
                                    {Object.keys(suggestions).length === 0 && (
                                        <>
                                            {__('Not found any', 'dragblock')}
                                        </>
                                    )}
                                </>
                                )}

                            </div>
                        )}
                        {Object.entries(autoSearchResults).length !== 0 && (
                            <div
                                className='results'
                            >{
                                    Object.entries(autoSearchResults).map(([slug, prop], index) => {
                                        let note = slug;
                                        let label = slug;

                                        // console.log(index, autoSuggestSelected);
                                        if (typeof (prop) === 'string') {
                                            label = prop;
                                        } else {
                                            if (prop['note']) {
                                                note = prop['note']
                                            }
                                            else if (prop['label']) {
                                                note = prop['label']
                                            }

                                            if (prop['label']) {
                                                label = prop['label']
                                            }
                                        }



                                        return (
                                            <div className='item' onMouseEnter={
                                                () => {
                                                    setAutoSuggestSelected(index);
                                                }
                                            }>
                                                <a
                                                    className={classnames('item-link', {
                                                        'active': autoSuggestSelected == index
                                                    })}
                                                    onClick={() => {
                                                        onClick(slug);
                                                    }}
                                                >
                                                    <Tooltip
                                                        delay={0}
                                                        text={note}
                                                        position='middle left'
                                                    >
                                                        <code>{label}</code>
                                                    </Tooltip>
                                                </a>

                                            </div>
                                        )
                                    })
                                }</div>
                        )}
                    </Popover>
                ) : null
            }
        </div >

    );
}





/*
import { Autocomplete } from "@wordpress/components";
import { debounce } from "lodash";

const MyControl = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setAjaxResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onSelectCategory = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    const categoryIds = selectedOptions.map((option) => option.id);
    wp.data
      .dispatch("core/block-editor")
      .setSelectedBlockAttributes({ categoryIds });
  };

  const fetchCategories = debounce((query) => {
    if (!query) {
      setAjaxResults([]);
      return;
    }

    const searchParams = new URLSearchParams({ search: query });
    wp.apiFetch({ path: `/wp/v2/categories?${searchParams.toString()}` }).then(
      (data) => {
        setAjaxResults(
          data.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        );
      }
    );
  }, 500);

  const onInputChange = (query) => {
    setSearchQuery(query);
    fetchCategories(query);
  };

  return (
    <PanelBody title="My Control">
      <Autocomplete
        label="Search categories"
        placeholder="Type to search categories"
        options={categoryOptions}
        selected={selectedCategories}
        onChange={onSelectCategory}
        isMulti
        onInputChange={onInputChange}
      />
    </PanelBody>
  );
};
*/