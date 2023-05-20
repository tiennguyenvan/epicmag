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
    ButtonGroup
} from '@wordpress/components'

import DimensionControl from './dimension-control';
import BorderStyleControl from './border-style-control';
import {dragBlockShadowValue} from '../../library/ultils/styling'

export default function MarginControl({value, onChange, colors}) {

	if (typeof(value) == 'undefined') value = '';

	return (		
		<div className='dragblock-margin-control'>
			<ToggleControl
				label={__('Auto', 'dragblock')}
				position='middle left'
				help={
					(value === 'auto')
						? __('Auto', 'dragblock')
						: __('Fixed', 'dragblock')
				}
				checked={ value === 'auto' }
				onChange={ () => {
					onChange(value === 'auto' ? '' : 'auto');
				} }
			/>
			<Tooltip
				text={__('Margin Value', 'dragblock')}
				position='middle left'
				delay={0}
			>
				<div>
					<DimensionControl
						value={ value === 'auto' ? '' : value }
						units = {{px: {value: 'px', label: 'px', min: -500, max: 500, step: 1, default: 0}}}
						onChange={ ( newValue ) => {
							onChange(newValue);
						}}
					/>
				</div>
			</Tooltip>
		</div>
	)
}