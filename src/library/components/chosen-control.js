import { useState } from '@wordpress/element';
import classnames from 'classnames';

import {
    SearchControl, Tooltip,
    Popover, Button
} from '@wordpress/components';

import { iconPlus } from '../icons/icons'
import { TextControl } from '@wordpress/components';




export default function ChosenControl({
    placeholder,
    onChange,

    value: originalValue,
    // top, lef, right, bottom. Default: bottom
    position,
    /*
    {
        slug: 'label'
    }
     */
    options,
}) {

    const [choseIndex, setChoseIndex] = useState(0);
    const [chosenResults, setChosenResults] = useState({});
    if (!originalValue) {
        originalValue = ''
    }


    if (!options) {
        options = {};
    }
    if (!position) {
        position = 'bottom'
    }
    const closeList = () => {
        setChoseIndex(0);
        setChosenResults({});
    }


    const showList = (value) => {
        let results = {};
        let results_len = 0;

        // return for empty input
        if (!value || !value.trim()) {
            for (let slug in options) {
                results[slug] = options[slug];
                if (++results_len == 10) {
                    break;
                }
            }

            setChosenResults({ ...results });            
            return;
        }

        let searchWords = value.toLowerCase().trim().replace(/-/gi, ' ').split(' ').map(e => e.trim());
        // let searchOneWord = searchWords.join('').replace(/ /gi, '');

        
        
        for (let slug in options) {
            let q = slug + ' ' + options[slug].toLowerCase();

            let match = true;
            for (let word of searchWords) {
                if (q.indexOf(word) == -1) {
                    match = false;
                    break;
                }
            }


            if (match) {
                results[slug] = options[slug];

                if (++results_len >= 10) break;
            }
        }

        // if cannot find any suggestion, try with the last word only
        if (results_len < 10) {
            let lastWord = value.split(' ');
            if (lastWord.length > 1) {
                showList(lastWord[lastWord.length - 1]);
                return;
            }
        }

        setChosenResults({ ...results });

    }

    return (
        <div className={'dragblock-chosen-control ' + position} onMouseLeave={closeList}>
            <TextControl

                value={originalValue}
                placeholder={placeholder}

                onKeyDown={(event) => {                    
                    // up
                    if (event.key === 'ArrowUp') {
                        if (choseIndex <= 0) setChoseIndex(Object.keys(chosenResults).length - 1)
                        else setChoseIndex(choseIndex - 1)
                    }
                    // down
                    else if (event.key === 'ArrowDown') {
                        if (choseIndex >= Object.keys(chosenResults).length - 1) setChoseIndex(0)
                        else setChoseIndex(choseIndex + 1)
                    }                    
                    else if (event.key == "Enter" || event.key === 'ArrowRight') {
                        closeList();
                        let keys = Object.keys(chosenResults);
                        if (keys.length - 1 < choseIndex || choseIndex < 0) return;
                        let slug = keys[choseIndex];

                        // append to the right
                        if (event.key === 'ArrowRight') {
                            let lastWord = originalValue.split(' ');
                            if (lastWord.length > 1) {
                                lastWord[lastWord.length - 1] = slug;
                                onChange(lastWord.join(' '));
                            } else {
                                onChange(originalValue + slug);
                            }
                            return;
                        }

                        onChange(slug)
                    }
                }}
                onClick={() => {
                    showList(originalValue)
                }}
                onFocus={() => {                    
                    showList(originalValue)
                }}
                onChange={(value) => {
                    showList(value);
                    onChange(value)
                }}
            />
            {(Object.keys(options).length > 0) && (Object.keys(chosenResults).length > 0) && (
                <div className='options'
                    onMouseLeave={closeList}
                >
                    {Object.entries(chosenResults).map(([slug, label], index) => {
                        return (<a
                            onClick={() => {

                                onChange(slug)


                                closeList();
                            }}
                            className={classnames('option', {
                                'active': choseIndex === index
                            })}
                        >
                            {label}
                        </a>)
                    })}
                </div>
            )}
        </div>
    )
}