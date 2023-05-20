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

export default function PositionControl({value, onChange}) {	
	return (
        <SelectControl
            // label={ __('')}
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'static', label: __('Static', 'dragblock')},
				{ value: 'relative', label: __('Relative', 'dragblock')},
				{ value: 'absolute', label: __('Absolute', 'dragblock')},
				{ value: 'fixed', label: __('Fixed', 'dragblock')},
				{ value: 'sticky', label: __('Sticky', 'dragblock')},
			] }
            onChange={ ( value ) => onChange( value ) }
            // __nextHasNoMarginBottom
        />
    );

	/*
	const buttons = [		
		{text:__('---', 'dragblock'), label:__('Default', 'dragblock'), value: ''},
		{text:__('Sta', 'dragblock'), label:__('Static', 'dragblock'), value: 'static'},
		{text:__('Rel', 'dragblock'),label:__('Relative', 'dragblock'), value: 'relative'},
		{text:__('Abs', 'dragblock'),label:__('Absolute', 'dragblock'), value: 'absolute'},
		{text:__('Fix', 'dragblock'),label:__('Fixed', 'dragblock'), value: 'fixed'},
		{text:__('Stk', 'dragblock'),label:__('Sticky', 'dragblock'), value: 'sticky'},
		
	];

	// console.log(value, onChange);
	
	return (
		<div className='dragblock-position-control'>
			<ButtonGroup>
				{
					buttons.map(b=>
						<Tooltip
							text={b.label}
							position='top center'
							delay={0}
						>
							<Button
								variant={(value == b.value) ? 'primary' : ''}
								onClick={()=>{
									onChange(b.value)
								}}
							>
								{b.text}
							</Button>
						</Tooltip>
					)
				}
			</ButtonGroup>
		</div>
	)
	*/
}