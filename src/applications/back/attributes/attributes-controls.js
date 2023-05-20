
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { cloneDeep, isEmpty } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useEffect, useState } from '@wordpress/element'
import { useBlockProps } from '@wordpress/block-editor';

import {
    InspectorAdvancedControls,
    InspectorControls,
    useSetting,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor'

import {
    ToggleControl,
    PanelBody,
    SearchControl,
    ColorPicker,
    ColorPalette,
    Tooltip,
    Popover,
    Autocomplete,
    Button,
    ButtonGroup,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components'


import DimensionControl from '../../../library/components/dimension-control';
import FontSizeControl from '../../../library/components/font-size-control';
import FontWeightControl from '../../../library/components/font-weight-control';
import LineHeightControl from '../../../library/components/line-height-control';
import TextDecorationControl from '../../../library/components/text-decoration-control';
import TextDecorationLineControl from '../../../library/components/text-decoration-line-control';
import TextDecorationStyleControl from '../../../library/components/text-decoration-style-control';
import TextTransformControl from '../../../library/components/text-transform-control';
import BorderStyleControl from '../../../library/components/border-style-control';
import BorderControl from '../../../library/components/border-control';
import TextShadowControl from '../../../library/components/text-shadow-control';
import BoxShadowControl from '../../../library/components/box-shadow-control';
import PositionControl from '../../../library/components/position-control';
import DisplayControl from '../../../library/components/display-control';

import {
    dragBlockMatchingColors,
    dragBlockMatchingBorderColors,
    dragBlockUnmatchingColors,
    dragBlockUnmatchingBorderColors,
    invertColor,
    dragBlockUnmatchingSizes,
    dragBlockMatchingSizes
} from '../../../library/ultils/styling';


import {
    attributesNames as propNames,
    defaultAttributes as defaultProps,
    findAttrIndex
} from './attributes-settings';


import { TextControl } from '@wordpress/components';
import { Flex } from '@wordpress/components';
import { FlexItem } from '@wordpress/components';
import TranslateControl from '../../../library/components/translate-control';
import TransformControl from '../../../library/components/transform-control';
import AlignItemsControl from '../../../library/components/align-items-control';
import JustifyContentControl from '../../../library/components/justify-content-control';
import FlexWrapControl from '../../../library/components/flex-wrap-control';
import FlexDirectionControl from '../../../library/components/flex-direction-control';
import MarginControl from '../../../library/components/margin-control';
import TextAlignControl from '../../../library/components/text-align-control';
import WidthControl from '../../../library/components/width-control';
import SelectorsControl from '../../../library/components/selectors-control';
import PopoverProperty from '../../../library/components/popover-property';
import AutocompleteSearchBox from '../../../library/components/autocomplete-search-box';
import { SelectControl, FormFileUpload } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { select } from '@wordpress/data'
import { isBanningBlock } from '../../../library/ultils/banning';
import ChosenControl from '../../../library/components/chosen-control';
import { dragBlockQueryShortcodes } from '../../../library/ultils/shortcodes';
import { wpSystemNativeClasses } from '../../../library/ultils/selector';
import MultillingualTextControl from '../../../library/components/multilingual-text-control';


/**
 * @info Add setting controls to the Inspector Panels or the Toolbar
 * @note setAttributes will trigger BlockEdit filter (and select Block for Grouping will also trigger BlockEdit)
 * so that will be an infinity loop if You setAttributes "automatically" inside BlockEdit
 * 
 * @note You also need to check if the attribute you want to set automatically has the same as its saved value
 * If it does, don't save because it will trigger infinity loops
 */

const dragBlockAttributesControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);

        if (isBanningBlock(props)) {
            return (<BlockEdit {...props} />)
        }

        let { dragBlockClientId, dragBlockAttrs } = attributes;

        // you should have this to prevent infinite rerender update
        // console.log('Block: ', props.name, dragBlockClientIds);
        if (!dragBlockClientId) {
            setAttributes({ dragBlockClientId: clientId })
        }

        if (!isSelected) {
            return (<BlockEdit {...props} />)
        }
        if (!dragBlockAttrs) {
            dragBlockAttrs = [];
        }

        const updateDragBlockAttrs = (value, index, locale) => {
            let newAttr = cloneDeep(dragBlockAttrs)
            newAttr[index]['value'] = value;

            if (locale) {
                newAttr[index]['locale'] = locale;
            }

            setAttributes({ dragBlockAttrs: newAttr })
        }

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls ><div className='dragblock-inspector-controls attributes'>
                    <PanelBody
                        title={__('Attributes', 'dragblock')}
                        initialOpen={dragBlockAttrs.length > 0}
                    >
                        {/* 
                        ------------------------------------------------------------------
                        SEARCH                                        
                        Show the added properties 
                        */}
                        <AutocompleteSearchBox
                            placeholder={__('+ Add an Attribute', 'dragblock')}
                            onSelect={(slug) => {
                                let attr = cloneDeep(dragBlockAttrs)

                                attr.unshift({
                                    value: '',
                                    slug: slug,
                                    // devices: '',
                                    // states: '',
                                    // disabled: '',
                                    // locale: '',
                                });
                                setAttributes({ dragBlockAttrs: attr })
                                setShowControlPopover(0);

                            }}
                            suggestions={propNames}
                        />

                        {/* 
                        ------------------------------------------------------------------
                        PROPERTIES                                        
                        Show the added properties 
                        */}
                        {dragBlockAttrs && 0 != dragBlockAttrs.length && (
                            <div className='properties'>
                                {
                                    dragBlockAttrs.map((prop, index) => {
                                        return (
                                            <div>
                                                {/* 
                                                -----------------------------------------------------------------
                                                SHOW PROPERTIES
                                                */}
                                                <Tooltip
                                                    delay={0}
                                                    text={propNames[prop.slug].note}
                                                    position='middle left'
                                                >
                                                    <a
                                                        className={
                                                            classnames('', {
                                                                'disabled': !!prop['disabled']
                                                            })
                                                        }
                                                        onClick={() => {
                                                            setShowControlPopover(index);
                                                        }}
                                                    >
                                                        <code>{propNames[prop.slug].label}{
                                                            prop['locale'] ? (
                                                                <span>{prop['locale']}</span>
                                                            ) : null
                                                        }:</code>
                                                        {prop.value}
                                                    </a>
                                                </Tooltip>


                                                {/* 
                                                -----------------------------------------------------------------
                                                MODIFY PROPERTY POP OVER
                                                */}

                                                {
                                                    showControlPopover == index ? (
                                                        <PopoverProperty
                                                            className='dragblock-attributes-control-popover'
                                                            onClose={() => { setShowControlPopover(-1); }}
                                                            onMouseLeave={() => { setShowControlPopover(-1); }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Escape' || event.key === 'Enter') {
                                                                    setShowControlPopover(-1);
                                                                }
                                                            }}
                                                            onAction={(action, newList) => {
                                                                // toggle disable properties
                                                                if ('disable' === action) {
                                                                    if (newList[index]['disabled']) {
                                                                        delete newList[index]['disabled'];
                                                                    } else {
                                                                        newList[index]['disabled'] = '*';
                                                                    }

                                                                }
                                                                setShowControlPopover(-1);
                                                                setAttributes({ dragBlockAttrs: newList })
                                                            }}

                                                            title={propNames[prop.slug].label}
                                                            disabled={prop['disabled']}
                                                            list={dragBlockAttrs}
                                                            index={index}

                                                        >
                                                            {/* 
                                                            --------------------------------------------------------------------
                                                            POPOVER VALUE >>>>>>>>>>>>>
                                                            --------------------------------------------------------------------
                                                            */}
                                                            <div className='value'>
                                                                {/* ACTION */}
                                                                {propNames[prop.slug].type == 'action' && (
                                                                    <ChosenControl
                                                                        options={
                                                                            {
                                                                                '[dragblock.form.action]': __('DragBlockForm Action'),
                                                                            }
                                                                        }
                                                                        onChange={(value) => {
                                                                            updateDragBlockAttrs(value, index)
                                                                        }}
                                                                        value={prop.value}
                                                                        placeholder={__('Input Action Type', 'dragblock')}
                                                                    />
                                                                )}
                                                                {/* MULTILINGUAL TEXT */}
                                                                {propNames[prop.slug].type == 'multilingual-text' && (
                                                                    <MultillingualTextControl
                                                                        onChange={(value, locale) => {
                                                                            updateDragBlockAttrs(value, index, locale)
                                                                        }}
                                                                        value={prop['value']}
                                                                        locale={prop['locale']}
                                                                    />
                                                                )}
                                                                {/* TEXT */}
                                                                {propNames[prop.slug].type == 'text' && (
                                                                    <ChosenControl
                                                                        options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                                                                        onChange={(value) => {

                                                                            updateDragBlockAttrs(value, index)
                                                                        }}
                                                                        value={prop.value}
                                                                        placeholder={__('Input Attribute Value', 'dragblock')}
                                                                    />
                                                                )}

                                                                {/* Number */}
                                                                {propNames[prop.slug].type == 'number' && (
                                                                    <NumberControl
                                                                        value={(prop.value ? Number(prop.value) : '')}
                                                                        min={-99}
                                                                        max={9999}
                                                                        step={1}
                                                                        onChange={(value) => { updateDragBlockAttrs(value, index) }}
                                                                    />
                                                                )}

                                                                {/* Select */}
                                                                {propNames[prop.slug].type == 'select' && (
                                                                    <SelectControl
                                                                        value={prop.value}
                                                                        options={propNames[prop.slug].options ? propNames[prop.slug].options : []}
                                                                        onChange={(value) => { updateDragBlockAttrs(value, index) }}
                                                                    />
                                                                )}

                                                            </div>


                                                        </PopoverProperty>
                                                    ) : null
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}




                    </PanelBody>

                </div></InspectorControls >
            </>
        );
    };
}, 'dragBlockAttributesControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/attributes-controls',
    dragBlockAttributesControls
);

var dragBlockClientIds = new Set();

window['dragBlockSelectorSuggestions'] = {
    classes: new Object(),
    ids: new Object(),
    attrs: new Object(),
}
window['dragBlockSystemClasses'] = wpSystemNativeClasses;


const dragBlockAttributesControlsUniqueID = createHigherOrderComponent((BlockListBlock) => {

    return (props) => {

        const { attributes, setAttributes, clientId } = props;
        let { dragBlockClientId, dragBlockAttrs, className, anchor } = attributes;

        if (window['dragBlockSystemClasses'][props.name]) {
            let classes = '';
            window['dragBlockSelectorSuggestions']['classes'][props.name] = window['dragBlockSystemClasses'][props.name].join(' ')
            delete window['dragBlockSystemClasses'][props.name]
        }

        // useEffect(() => {
        //     if (className) className.split(' ').map(e => {
        //         window['dragBlockSelectorSuggestions']['classes'].add(e.trim())
        //     })
        //     if (anchor) window['dragBlockSelectorSuggestions']['ids'].add(anchor.trim())
        //     if (dragBlockAttrs) dragBlockAttrs.map(attr => {
        //         if (attr['slug']) window['dragBlockSelectorSuggestions']['attrs'].add(attr['slug'].trim())
        //     })
        // });


        useEffect(() => { // every time when rerender happens, reset the dragBlockClientIds            
            if (dragBlockClientId != clientId &&
                (!dragBlockClientId || dragBlockClientIds.has(dragBlockClientId))
            ) {
                dragBlockClientId = clientId;
                setAttributes({ dragBlockClientId: dragBlockClientId })
            }

            if (className && dragBlockClientId) {
                window['dragBlockSelectorSuggestions']['classes'][dragBlockClientId] = className;
            }

            if (anchor && dragBlockClientId) {
                window['dragBlockSelectorSuggestions']['ids'][dragBlockClientId] = anchor;
            }

            dragBlockClientIds.add(dragBlockClientId)
        });

        let wrapperProps = {
            ...props.wrapperProps,
            'data-dragBlock-client-id': dragBlockClientId
        };
        
        // set DragBlock attribute for the block in editor
        if (dragBlockAttrs && dragBlockAttrs.length) {

            for (let attr of dragBlockAttrs) {
                if (isEmpty(attr['value']) || !isEmpty(attr['disabled'])) {
                    continue;
                }
                let value = '';
                // if (attr['slug'] === 'required') {
                //     // prevent to lose forcus when choosing submit input
                //     value = '';
                // }
                if (attr['slug'] === 'href') {
                    value = '#dragBlock-href-placeholder';
                }
                else if (propNames[attr['slug']].type == 'multilingual-text') {
                    if (attr['locale'] === DRAG_BLOCK_SITE_LOCALE) {
                        value = attr['value'];
                    }
                }
                else {
                    value = attr['value'];
                }

                if (!value) {
                    continue;
                }
                wrapperProps[attr['slug']] = value;
            }
        }

        if (anchor) {            
            wrapperProps['className'] = 'dragblock-id-classname-placeholder-' + anchor;
        }


        return (
            <>
                <BlockListBlock {...props} wrapperProps={wrapperProps}/>

            </>
        );
    };
}, 'dragBlockAttributesControlsUniqueID');

wp.hooks.addFilter(
    'editor.BlockListBlock',
    'dragblock/attributes-controls-unique-id',
    dragBlockAttributesControlsUniqueID
);