
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
import { dragBlockLanguages } from '../../../library/ultils/lang';


/**
 * @info Add setting controls to the Inspector Panels or the Toolbar
 * @note setAttributes will trigger BlockEdit filter (and select Block for Grouping will also trigger BlockEdit)
 * so that will be an infinity loop if You setAttributes "automatically" inside BlockEdit
 * 
 * @note You also need to check if the attribute you want to set automatically has the same as its saved value
 * If it does, don't save because it will trigger infinity loops
 */

const dragBlockContentControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes, clientId, isSelected } = props;
        const [showControlPopover, setShowControlPopover] = useState(-1);

        if (isBanningBlock(props) || !['dragblock/text', 'dragblock/option'].includes(props.name)) {
            return (<BlockEdit {...props} />)
        }

        let { dragBlockClientId, dragBlockText } = attributes;

        if (!isSelected) {
            return (<BlockEdit {...props} />)
        }
        if (!dragBlockText) {
            dragBlockText = [];
        }

        const updateDragBlockText = (value, index) => {
            let newText = cloneDeep(dragBlockText)
            newText[index]['value'] = value;

            setAttributes({ dragBlockText: newText })
        }

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls ><div className='dragblock-inspector-controls content'>
                    <PanelBody
                        title={__('Content', 'dragblock')}
                        initialOpen={dragBlockText.length > 0}
                    >
                        {/* 
                        ------------------------------------------------------------------
                        SEARCH                                        
                        Show the added properties 
                        */}
                        <AutocompleteSearchBox
                            placeholder={__('+ Add a Text', 'dragblock')}
                            onSelect={(slug) => {
                                let text = cloneDeep(dragBlockText)
                                text.unshift({
                                    value: '',
                                    slug: slug,
                                    // devices: '',
                                    // states: '',
                                    // disabled: '',
                                });
                                setAttributes({ dragBlockText: text })
                                setShowControlPopover(0);
                            }}
                            suggestions={dragBlockLanguages}
                        />

                        {/* 
                        ------------------------------------------------------------------
                        PROPERTIES                                        
                        Show the added properties 
                        */}
                        {dragBlockText && 0 != dragBlockText.length && (
                            <div className='properties'>
                                {
                                    dragBlockText.map((prop, index) => {
                                        return (
                                            <div>
                                                {/* 
                                                -----------------------------------------------------------------
                                                SHOW PROPERTIES
                                                */}
                                                <Tooltip
                                                    delay={0}
                                                    text={dragBlockLanguages[prop.slug]}
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
                                                        <code
                                                            className={
                                                                classnames('', {
                                                                    'active': prop.slug === DRAG_BLOCK_SITE_LOCALE
                                                                })
                                                            }
                                                        >{prop.slug}:</code>{prop.value}
                                                    </a>
                                                </Tooltip>

                                                {/* 
                                                -----------------------------------------------------------------
                                                MODIFY PROPERTY POP OVER
                                                */}

                                                {
                                                    showControlPopover == index ? (
                                                        <PopoverProperty
                                                            className='dragblock-content-control-popover'
                                                            onClose={() => { setShowControlPopover(-1); }}
                                                            onMouseLeave={() => { setShowControlPopover(-1); }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Escape' || event.key === 'Enter') {
                                                                    setShowControlPopover(-1);
                                                                }
                                                            }}
                                                            onAction={(action, newText) => {
                                                                // toggle disable properties
                                                                if ('disable' === action) {
                                                                    if (newText[index]['disabled']) {
                                                                        delete newText[index]['disabled'];
                                                                    } else {
                                                                        newText[index]['disabled'] = '*';
                                                                    }
                                                                }
                                                                setShowControlPopover(-1);
                                                                setAttributes({ dragBlockText: newText })
                                                            }}

                                                            title={dragBlockLanguages[prop.slug]}
                                                            disabled={prop['disabled']}
                                                            list={dragBlockText}
                                                            index={index}
                                                        >
                                                            {/* 
                                                            --------------------------------------------------------------------
                                                            POPOVER VALUE >>>>>>>>>>>>>
                                                            --------------------------------------------------------------------
                                                            */}
                                                            <div className='value'>
                                                                <SelectControl
                                                                value={prop['slug']}
                                                                options={Object.entries(dragBlockLanguages).map(([key, value]) => {
                                                                    return { value: key, label: value }
                                                                })}
                                                                onChange={(value) => {
                                                                    let newText = cloneDeep(dragBlockText);
                                                                    newText[index]['slug'] = value;
                                                                    setAttributes({ dragBlockText: newText })
                                                                }}
                                                                />
                                                                <ChosenControl
                                                                    options={Object.fromEntries(Object.entries(dragBlockQueryShortcodes).map(([key, value]) => [key, value['label']]))}
                                                                    onChange={(value) => {
                                                                        let newText = cloneDeep(dragBlockText);
                                                                        newText[index]['value'] = value;
                                                                        setAttributes({ dragBlockText: newText })
                                                                    }}
                                                                    value={prop['value']}
                                                                    placeholder={__('Input Text Value', 'dragblock')}
                                                                />

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
}, 'dragBlockContentControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'dragblock/content-controls',
    dragBlockContentControls
);
