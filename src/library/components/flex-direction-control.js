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

export default function FlexDirectionControl({value, onChange}) {
	
	return (
        <SelectControl
            // label={ __('')}
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'row', label: __('Row', 'dragblock')},
				{ value: 'column', label: __('Column', 'dragblock')},
				{ value: 'row-reverse', label: __('Row Reverse', 'dragblock')},
				{ value: 'column-reverse', label: __('Column Reverse', 'dragblock')},
				
			] }
            onChange={ ( value ) => onChange( value ) }
            // __nextHasNoMarginBottom
        />
    );
}