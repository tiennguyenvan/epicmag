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

export default function TextDecorationStyleControl({value, onChange}) {

	const buttons = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},
		{label:__('Default', 'dragblock'), value: ''},
		{label:__('Solid', 'dragblock'), value: 'solid'},
		{label:__('Double', 'dragblock'), value: 'double'},
		{label:__('Dotted', 'dragblock'), value: 'dotted'},
		{label:__('Dashed', 'dragblock'), value: 'dashed'},
		{label:__('Wavy', 'dragblock'), value: 'wavy'},		
	];

	// console.log(value, onChange);

	return (
		<div className='dragblock-text-decoration-style-control'>
			<ButtonGroup>
				{
					buttons.map(b=>
						<Button
							style={{textDecorationStyle: b.value}}
							variant={(value==b.value) ? 'primary' : ''}
							onClick={()=>{
								onChange(b.value)
							}}
							showTooltip={true}
							tooltipPosition='top center'
							label={b.label}
							tooltipDelay={0}
						>
							{b.label}
						</Button>
					)
				}
			</ButtonGroup>
		</div>
	)
}