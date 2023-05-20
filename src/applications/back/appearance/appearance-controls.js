import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { cloneDeep, isString } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useEffect, useState } from '@wordpress/element'
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

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
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
    appearanceProperties as propNames,
    initDragBlockStyles
} from './appearance-settings'
import {
    dragBlockAppearanceStyle
} from './appearance-style';
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
import HeightControl from '../../../library/components/height-control';
import ChosenControl from '../../../library/components/chosen-control';
import { select } from '@wordpress/data'
import { isBanningBlock } from '../../../library/ultils/banning';
import ImageControl from '../../../library/components/image-control';
import { SelectControl } from '@wordpress/components';
import { getSelectors } from '../../../library/ultils/selector';
import AnimationNameControl from '../../../library/components/animation-control';


/**
 * @info Add setting controls to the Inspector Panels or the Toolbar
 */
const dragBlockApperanceControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, isSelected, clientId } = props;



        ////////////////////////////////
        // BANNED BLOCKS
        // Unbanned blocks that have real enity like columns/rows/groups
        // Ban the core/comments also
        ////////////////////////////////        
        if (isBanningBlock(props)) {
            return (<BlockEdit {...props} />)
        }

        // BANNED BLOCKS
        ////////////////////////////////



        let { dragBlockStyles } = attributes;
        const [showControlPopover, setShowControlPopover] = useState(-1);
        const avaiColors = useSetting('color.palette.theme').concat(useSetting('color.palette.custom') || [])/*.concat(useSetting('color.palette.default'));;*/
        const contentSize = useSetting('layout.contentSize');
        const wideSize = useSetting('layout.wideSize');

        // if (!attributes['data-dragBlock-client-id']) setAttributes({'data-dragBlock-client-id': clientId});

        // show some default properties so newbies could change immediately instead of searching
        if (!dragBlockStyles) {
            dragBlockStyles = initDragBlockStyles(props.name);
        }

        const showColorPreview = (value) => {
            if (!isString(value)) {
                return value;
            }
            if (value.indexOf('#') === -1) return value
            value = value.split('#');
            return (
                <>
                    <span>{value[0]}  </span>
                    <span className='color'
                        style={{
                            backgroundColor: '#' + value[1]
                        }}
                    ></span>#{value[1]}


                </>
            )
        }

        const updateDragBlockStyles = (value, index, color = false, size = false) => {
            if (typeof (value) === 'undefined') {
                return;
            }
            if (color) {
                value = dragBlockMatchingColors({ value: value.trim(), colors: avaiColors });
            }
            if (size) {
                value = dragBlockMatchingSizes({ value, contentSize, wideSize });
            }

            // let style = [...dragBlockStyles]
            let style = cloneDeep(dragBlockStyles)
            style[index].value = value;

            setAttributes({ dragBlockStyles: style })
        }

        // supported states 
        // let supportedStates = {
        //     ':hover': {toolTip: __('(h) Mouse Hover', 'dragblock'), short: 'h'},
        //     ':focus': {toolTip: __('(f) Tab Focus', 'dragblock'), short: 'f'},
        //     ':checked': {tooltip: __('(c) Checked Input', 'dragblock'), short: 'c'},
        //     ':target': {target: __('(t) Targeted Element', 'dragblock'), short: 't'},
        // }
        let supportedStates = {
            ':hover': __('(h) Mouse Hover', 'dragblock'),
            ':focus': __('(f) Tab Focus', 'dragblock'),
            ':checked': __('(c) Checked Input', 'dragblock'),
            ':target': __('(t) Targeted Element', 'dragblock'),
            ':active': __('(a) Activated Element', 'dragblock'),

        }

        let supportedStateLabels = Object.keys(supportedStates);

        return (
            <>
                <BlockEdit {...props} />
                {/*props.name.indexOf('dragblock') != -1*/ true && (
                    <>

                        {/* 
                            -----------------------------------------------------------------
                            CUSTOM STYLE
                            -----------------------------------------------------------------
                            */}
                        <InspectorControls><div className='dragblock-inspector-controls appearance'>
                            <PanelBody
                                title={__('Appearance', 'dragblock')}
                            >
                                {/* 
                                ------------------------------------------------------------------
                                SEARCH                                        
                                Show the added properties 
                                */}
                                


                                <AutocompleteSearchBox
                                    placeholder={__('+ Add a Property', 'dragblock')}
                                    onSelect={(slug) => {
                                        let style = cloneDeep(dragBlockStyles)
                                        style.unshift({
                                            value: '',
                                            slug: slug,
                                            // devices: '',
                                            // states: '',
                                            // disabled: '',
                                            // object: '',
                                        });
                                        setAttributes({ dragBlockStyles: style })
                                        setShowControlPopover(0);
                                    }}

                                    suggestions={propNames}
                                />

                                {/* 
                                ------------------------------------------------------------------
                                PROPERTIES           
                                ------------------------------------------------------------------                                
                                Show the added properties 
                                We don't organize the properties into selectors because that is not
                                the way our brain thinking and that is also not flexible as leaving
                                the properties standing alone.
                                */}
                                {dragBlockStyles && 0 != dragBlockStyles.length && (
                                    <div className='properties'>
                                        {
                                            dragBlockStyles.map((prop, index) => {

                                                let showStates = true;
                                                let stateSelectors = new Object();
                                                let stateSelectorSet = '';
                                                if (prop['selectors']) {
                                                    let selectors = prop['selectors'].split(',').map(e => e.trim());
                                                    for (let selector of selectors) {
                                                        // this selector has a state
                                                        if (selector.indexOf(':') !== -1) {
                                                            selector = selector.split(':');

                                                            // this is a custom state, 
                                                            // so users want to input custome selectors by themselves
                                                            if (!supportedStates[':' + selector[1]]) {
                                                                showStates = false;
                                                                break;
                                                            }

                                                            // this has both stated and empty selectors
                                                            // so users want to input custom selectors by themselves as well
                                                            if (stateSelectors['']) {
                                                                showStates = false;
                                                                break;
                                                            }


                                                            if (!stateSelectors[':' + selector[1]]) {
                                                                stateSelectors[':' + selector[1]] = new Set();
                                                            }
                                                            stateSelectors[':' + selector[1]].add(selector[0]);
                                                            continue;
                                                        }



                                                        // this selector has no state
                                                        if (!stateSelectors['']) {
                                                            stateSelectors[''] = new Set();
                                                        }
                                                        stateSelectors[''].add(selector);
                                                    }

                                                    // still valid to show states
                                                    if (showStates) {
                                                        // compare all states
                                                        // all states should have the same state selector set 
                                                        // to allow showing states

                                                        for (let state in stateSelectors) {

                                                            let orderedSelectors = [...stateSelectors[state]].sort((a, b) => a > b).join(',');
                                                            stateSelectors[state] = true;
                                                            // save the first ordered selector
                                                            if (!stateSelectorSet) {
                                                                stateSelectorSet = orderedSelectors;
                                                                continue;
                                                            }

                                                            // compare with others, if mismatched, then not show the states
                                                            if (stateSelectorSet !== orderedSelectors) {
                                                                showStates = false;
                                                                break;
                                                            }
                                                        }
                                                        if (stateSelectors['']) {
                                                            delete stateSelectors[''];
                                                        }

                                                    }
                                                }



                                                return (
                                                    <div>
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
                                                                {prop['devices'] ? (<strong className='devices'>{prop['devices']}</strong>) : null}
                                                                {prop['parent-selectors'] ?
                                                                    (<strong className='selectors'>{prop['parent-selectors']}</strong>)
                                                                    :
                                                                    (prop['parent-states'] ? (
                                                                        <strong className='selectors'>*</strong>)
                                                                        : null
                                                                    )
                                                                }
                                                                {prop['parent-states'] ? (<strong className='parent-states'>{prop['parent-states']}</strong>) : null}
                                                                {prop['selectors'] ?
                                                                    (<strong className='selectors'>{prop['selectors']}</strong>)
                                                                    :
                                                                    ((prop['parent-selectors'] || prop['parent-states']) ?
                                                                        (<strong className='selectors'>Self</strong>)
                                                                        :
                                                                        null
                                                                    )
                                                                }
                                                                {prop['states'] ? (<strong className='states'>{prop['states']}</strong>) : null}


                                                                <code>{propNames[prop.slug].label}:</code>
                                                                {prop.value ?
                                                                    (
                                                                        <span
                                                                            className={'value-preview ' + propNames[prop.slug].type}
                                                                        >
                                                                            {showColorPreview(
                                                                                dragBlockUnmatchingSizes({
                                                                                    value: dragBlockUnmatchingColors({
                                                                                        value: prop.value, colors: avaiColors
                                                                                    }),
                                                                                    contentSize,
                                                                                    wideSize
                                                                                })
                                                                            )}
                                                                        </span>
                                                                    ) :
                                                                    (
                                                                        <span>default</span>
                                                                    )
                                                                }
                                                            </a>
                                                        </Tooltip>


                                                        {/* 
                                                            -----------------------------------------------------------------
                                                            MODIFY PROPERTY POP OVER
                                                             */}

                                                        {
                                                            showControlPopover == index ? (
                                                                <PopoverProperty
                                                                    className='dragblock-appearance-control-popover'
                                                                    onClose={() => {
                                                                        setShowControlPopover(-1);
                                                                    }}
                                                                    // onMouseLeave={() => { setShowControlPopover(-1); }}
                                                                    onKeyDown={(event) => {
                                                                        if (event.key === 'Escape') {
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
                                                                        setAttributes({ dragBlockStyles: newList })
                                                                    }}

                                                                    title={propNames[prop.slug].label}
                                                                    disabled={prop['disabled']}
                                                                    list={dragBlockStyles}
                                                                    index={index}

                                                                >
                                                                    {/* 
                                                                    --------------------------------------------------------------------
                                                                    POPOVER VALUE >>>>>>>>>>>>>
                                                                    --------------------------------------------------------------------
                                                                    */}
                                                                    <div className='value'>
                                                                        {/* COLOR */}
                                                                        {propNames[prop.slug].type == 'color' && (
                                                                            <ColorPalette
                                                                                enableAlpha={true}
                                                                                colors={avaiColors}
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: avaiColors })}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            >
                                                                            </ColorPalette>
                                                                        )}

                                                                        {/* UNIT */}
                                                                        {propNames[prop.slug].type == 'unit' && (
                                                                            <DimensionControl
                                                                                value={prop.value}
                                                                                units={
                                                                                    propNames[prop.slug]['units'] ? propNames[prop.slug]['units'] : null
                                                                                }
                                                                                onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                            />

                                                                        )}
                                                                        {/* SELECT */}
                                                                        {propNames[prop.slug].type == 'select' && (
                                                                            <SelectControl
                                                                                value={prop.value}
                                                                                options={propNames[prop.slug].options}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                            />

                                                                        )}
                                                                        {/* TEXT */}
                                                                        {propNames[prop.slug].type == 'text' && (
                                                                            <TextControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                            />
                                                                        )}
                                                                        {/* Margin */}
                                                                        {(propNames[prop.slug].type.indexOf('margin') != -1) && (
                                                                            <MarginControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />

                                                                        )}
                                                                        {/* Number */}
                                                                        {propNames[prop.slug].type == 'number' && (
                                                                            <NumberControl
                                                                                value={(prop.value ? Number(prop.value) : '')}
                                                                                min={propNames[prop.slug].min ? propNames[prop.slug].min : -99}
                                                                                max={propNames[prop.slug].max ? propNames[prop.slug].max : 9999}
                                                                                step={propNames[prop.slug].step ? propNames[prop.slug].step : 1}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index) }}
                                                                            />
                                                                        )}

                                                                        {/* FONT SIZE */}
                                                                        {propNames[prop.slug].type == 'font-size' && (
                                                                            <FontSizeControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* FONT WEIGHT */}
                                                                        {propNames[prop.slug].type == 'font-weight' && (
                                                                            <FontWeightControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* LINE HEIGHT */}
                                                                        {propNames[prop.slug].type == 'line-height' && (
                                                                            <LineHeightControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* TEXT DECORATION LINE */}
                                                                        {propNames[prop.slug].type == 'text-decoration-line' && (
                                                                            <TextDecorationLineControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* TEXT DECORATION STYLE */}
                                                                        {propNames[prop.slug].type == 'text-decoration-style' && (
                                                                            <TextDecorationStyleControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* TEXT TRANSFORM */}
                                                                        {propNames[prop.slug].type == 'text-transform' && (
                                                                            <TextTransformControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* TEXT ALIGN */}
                                                                        {propNames[prop.slug].type == 'text-align' && (
                                                                            <TextAlignControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}

                                                                        {/* TEXT DECORATION */}
                                                                        {propNames[prop.slug].type == 'text-decoration' && (
                                                                            <TextDecorationControl
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: avaiColors })}
                                                                                colors={avaiColors}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            />
                                                                        )}
                                                                        {/* BORDER STYLE */}
                                                                        {propNames[prop.slug].type == 'border-style' && (
                                                                            <BorderStyleControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* BORDER */}
                                                                        {propNames[prop.slug].type == 'border' && (
                                                                            <BorderControl
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: avaiColors })}
                                                                                colors={avaiColors}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            />
                                                                        )}
                                                                        {/* TEXT SHADOW */}
                                                                        {propNames[prop.slug].type == 'text-shadow' && (
                                                                            <TextShadowControl
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: avaiColors })}
                                                                                colors={avaiColors}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            />
                                                                        )}
                                                                        {/* BOX SHADOW */}
                                                                        {propNames[prop.slug].type == 'box-shadow' && (
                                                                            <BoxShadowControl
                                                                                value={dragBlockUnmatchingColors({ value: prop.value, colors: avaiColors })}
                                                                                colors={avaiColors}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, true) }}
                                                                            />
                                                                        )}
                                                                        {/* POSITION */}
                                                                        {propNames[prop.slug].type == 'position' && (
                                                                            <PositionControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* POSITION */}
                                                                        {propNames[prop.slug].type == 'display' && (
                                                                            <DisplayControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* TRANSLATE */}
                                                                        {propNames[prop.slug].type == 'translate' && (
                                                                            <TranslateControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* TRANSFORM */}
                                                                        {propNames[prop.slug].type == 'transform' && (
                                                                            <TransformControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* ALIGN ITEMS */}
                                                                        {propNames[prop.slug].type == 'align-items' && (
                                                                            <AlignItemsControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* JUSTIFY CONTENT */}
                                                                        {propNames[prop.slug].type == 'justify-content' && (
                                                                            <JustifyContentControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* FLEX WRAP */}
                                                                        {propNames[prop.slug].type == 'flex-wrap' && (
                                                                            <FlexWrapControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* FLEX DIRECTION */}
                                                                        {propNames[prop.slug].type == 'flex-direction' && (
                                                                            <FlexDirectionControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}
                                                                        {/* WIDTH & FLEX BASIC*/}
                                                                        {(propNames[prop.slug].type == 'width' || propNames[prop.slug].type == 'flex-basis') && (
                                                                            <WidthControl
                                                                                value={dragBlockUnmatchingSizes({ value: prop.value, contentSize, wideSize })}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, false, true) }}
                                                                            />
                                                                        )}
                                                                        {/* HEIGHT */}
                                                                        {(propNames[prop.slug].type == 'height') && (
                                                                            <HeightControl
                                                                                value={dragBlockUnmatchingSizes({ value: prop.value, contentSize, wideSize })}
                                                                                onChange={(value) => { updateDragBlockStyles(value, index, false, true) }}
                                                                            />
                                                                        )}
                                                                        {/* ANIMATION NAME */}
                                                                        {(propNames[prop.slug].type == 'animation-name') && (
                                                                            <AnimationNameControl value={prop.value} onChange={(value) => { updateDragBlockStyles(value, index) }} />
                                                                        )}


                                                                    </div>


                                                                    {/* 
                                                                    --------------------------------------------------------------------
                                                                    >>>>>>>>>>>> POPOVER ADVANCED
                                                                    --------------------------------------------------------------------
                                                                    */}
                                                                    {/* DEVICES */}
                                                                    <Flex className='extra devices'>
                                                                        <FlexItem className='label'>{__('Devices', 'dragblock')}</FlexItem>
                                                                        <FlexItem className='control'>
                                                                            <Tooltip
                                                                                text={__('Desktop (d)', 'dragblock')}
                                                                                delay={0}
                                                                                position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['devices'] && prop['devices'].indexOf('d') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['devices']) style[index]['devices'] = '';
                                                                                        if (style[index]['devices'].indexOf('d') == -1) style[index]['devices'] += 'd';
                                                                                        else style[index]['devices'] = style[index]['devices'].replace('d', '')
                                                                                        if (style[index]['devices'] === '') delete style[index]['devices']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"></path></svg>

                                                                                </a>
                                                                            </Tooltip>




                                                                            <Tooltip
                                                                                text={__('Tablet (t)', 'dragblock')}
                                                                                delay={0} position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['devices'] && prop['devices'].indexOf('t') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['devices']) style[index]['devices'] = '';
                                                                                        if (style[index]['devices'].indexOf('t') == -1) style[index]['devices'] += 't';
                                                                                        else style[index]['devices'] = style[index]['devices'].replace('t', '')
                                                                                        if (style[index]['devices'] === '') delete style[index]['devices']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"></path></svg>

                                                                                </a>
                                                                            </Tooltip>

                                                                            <Tooltip
                                                                                text={__('Mobile (m)', 'dragblock')}
                                                                                delay={0} position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['devices'] && prop['devices'].indexOf('m') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['devices']) style[index]['devices'] = '';
                                                                                        if (style[index]['devices'].indexOf('m') == -1) style[index]['devices'] += 'm';
                                                                                        else style[index]['devices'] = style[index]['devices'].replace('m', '')
                                                                                        if (style[index]['devices'] === '') delete style[index]['devices']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"></path></svg>

                                                                                </a>
                                                                            </Tooltip>
                                                                        </FlexItem>
                                                                    </Flex>



                                                                    {/* STATES */}
                                                                    {showStates !== false && (<Flex className='extra states'>
                                                                        <FlexItem className='label'>{__('States', 'dragblock')}</FlexItem>
                                                                        <FlexItem className='control'>
                                                                            {
                                                                                Object.entries(supportedStates).map(([stateValue, stateText]) => {
                                                                                    return (
                                                                                        <Tooltip
                                                                                            text={stateText}
                                                                                            delay={0}
                                                                                            position='top center'
                                                                                        >
                                                                                            <a className={
                                                                                                classnames('extra-item', {
                                                                                                    'active': !!stateSelectors[stateValue],
                                                                                                })
                                                                                            }
                                                                                                onClick={() => {
                                                                                                    if (stateSelectors[stateValue]) {
                                                                                                        delete stateSelectors[stateValue];
                                                                                                    } else {
                                                                                                        stateSelectors[stateValue] = true;
                                                                                                    }
                                                                                                    stateSelectorSet = stateSelectorSet.split(',')



                                                                                                    let newSelector = Object.keys(stateSelectors).map(state => {
                                                                                                        return stateSelectorSet.join(state + ',') + state
                                                                                                    }).join(', ');






                                                                                                    let style = cloneDeep(dragBlockStyles)
                                                                                                    if (!style[index]['selectors']) {
                                                                                                        style[index]['selectors'] = newSelector;
                                                                                                    } else {
                                                                                                        style[index]['selectors'] = newSelector;
                                                                                                    }


                                                                                                    if (style[index]['selectors'] === '') {
                                                                                                        delete style[index]['selectors']
                                                                                                    }

                                                                                                    setAttributes({ dragBlockStyles: style })
                                                                                                }}
                                                                                            >
                                                                                                {stateValue}
                                                                                            </a>
                                                                                        </Tooltip>
                                                                                    )
                                                                                })
                                                                            }

                                                                            {/* <Tooltip
                                                                                text={__('(:h) Mouse Hover', 'dragblock')}
                                                                                delay={0}
                                                                                position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['states'] && prop['states'].indexOf('h') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['states']) style[index]['states'] = '';
                                                                                        if (style[index]['states'].indexOf('h') == -1) style[index]['states'] += 'h';
                                                                                        else style[index]['states'] = style[index]['states'].replace('h', '')
                                                                                        if (style[index]['states'] === '') delete style[index]['states']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    :hover
                                                                                </a>
                                                                            </Tooltip>




                                                                            <Tooltip
                                                                                text={__('(:f) Mouse Click / Tab Focus', 'dragblock')}
                                                                                delay={0} position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['states'] && prop['states'].indexOf('f') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['states']) style[index]['states'] = '';
                                                                                        if (style[index]['states'].indexOf('f') == -1) style[index]['states'] += 'f';
                                                                                        else style[index]['states'] = style[index]['states'].replace('f', '')
                                                                                        if (style[index]['states'] === '') delete style[index]['states']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    :focus

                                                                                </a>
                                                                            </Tooltip>

                                                                            <Tooltip
                                                                                text={__('(:a) On Mouse Down / Active', 'dragblock')}
                                                                                delay={0} position='top center'
                                                                            >
                                                                                <a className={
                                                                                    classnames('extra-item', {
                                                                                        'active': prop['states'] && prop['states'].indexOf('a') != -1
                                                                                    })
                                                                                }
                                                                                    onClick={() => {
                                                                                        let style = cloneDeep(dragBlockStyles)
                                                                                        if (!style[index]['states']) style[index]['states'] = '';
                                                                                        if (style[index]['states'].indexOf('a') == -1) style[index]['states'] += 'a';
                                                                                        else style[index]['states'] = style[index]['states'].replace('a', '')
                                                                                        if (style[index]['states'] === '') delete style[index]['states']

                                                                                        setAttributes({ dragBlockStyles: style })
                                                                                    }}
                                                                                >
                                                                                    :active
                                                                                </a>
                                                                            </Tooltip> */}


                                                                        </FlexItem>
                                                                    </Flex>)}


                                                                    {/* SELECTORS 
                                                                    We use "selector" and "parent-selector" to comply with the "states" and "parent-states"
                                                                    */}
                                                                    <Flex className='extra selectors'>
                                                                        <FlexItem className='label'>{__('Selectors', 'dragblock')}</FlexItem>
                                                                        <FlexItem className='control'>
                                                                            <ChosenControl
                                                                                position='top'
                                                                                options={getSelectors()}
                                                                                value={prop.selectors}
                                                                                
                                                                                onChange={(value) => {
                                                                                    let style = cloneDeep(dragBlockStyles);                                                                                    
                                                                                    style[index]['selectors'] = value;
                                                                                    setAttributes({ dragBlockStyles: style })
                                                                                }}
                                                                            />

                                                                        </FlexItem>
                                                                    </Flex>

                                                                    {/* PARENT SELECTORS */}
                                                                    {/* <Flex className='extra parent-selectors'>
                                                                        <FlexItem className='label'>{__('Parent', 'dragblock')}</FlexItem>
                                                                        <FlexItem className='control'>
                                                                            <SelectorsControl
                                                                                value={{ selectors: prop['parent-selectors'], states: prop['parent-states'] }}
                                                                                onChange={(value) => {
                                                                                    let style = cloneDeep(dragBlockStyles)
                                                                                    if (value['selectors']) {
                                                                                        style[index]['parent-selectors'] = value['selectors'];
                                                                                    }
                                                                                    else {
                                                                                        delete style[index]['parent-selectors']
                                                                                    }

                                                                                    if (value['states']) {
                                                                                        style[index]['parent-states'] = value['states'];
                                                                                    }
                                                                                    else {
                                                                                        delete style[index]['parent-states']
                                                                                    }
                                                                                    setAttributes({ dragBlockStyles: style })
                                                                                }}
                                                                            />
                                                                        </FlexItem>

                                                                    </Flex> */}
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

                        </div></InspectorControls>
                    </>

                )

                }

            </>
        );
    };
}, 'dragBlockApperanceControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/apperance-controls',
    dragBlockApperanceControls
);