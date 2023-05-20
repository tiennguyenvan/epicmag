import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'
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
    SelectControl,
} from '@wordpress/components'

import DimensionControl from './dimension-control';
import { TextControl } from '@wordpress/components';
import { dragBlockLanguages } from '../ultils/lang';
import { cloneDeep } from 'lodash';
import AutocompleteSearchBox from './autocomplete-search-box';

/**
 * 
 * @param {value, onchange} {value = [{slug: string, value: string}]} slug: en_US, vi, ...
 * @returns 
 */
export default function MultillingualTextControl({ value, locale, onChange }) {
    if (!locale) {
        locale = DRAG_BLOCK_SITE_LOCALE;
    }

    return (
        <div className='dragblock-multilingual-text-control'>
            <TextControl
                onChange={function (newValue) {
                    onChange(newValue, locale)
                }}
                value={value}
            />
            <AutocompleteSearchBox
                placeholder={locale ? dragBlockLanguages[locale] : dragBlockLanguages['en_US']}
                onSelect={(newLocale) => {
                    onChange(value, newLocale)
                }}
                suggestions={dragBlockLanguages}
            />
            {/* <SelectControl
                value={locale}
                onChange={(newLocale) => {
                    onChange(value, newLocale);
                }}
                options={Object.entries(dragBlockLanguages).map(([key, value]) => {
                    return { value: key, label: value }
                })}
                __nextHasNoMarginBottom
            /> */}
        </div>
    );
}