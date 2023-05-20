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

export default function FontSizeControl({value, onChange}) {

	// if (value == '') value = '1em'

	const buttons = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},
		// {text:'XS',label:__('Extra Small', 'dragblock'), value: '0.625em'},
		// {text:'S',label:__('Small', 'dragblock'), value: '0.8125rem'},
		{text:'S',label:__('Small', 'dragblock'), value: '13px'},
		{text:'-',label:__('Default', 'dragblock'), value: ''},
		{text:'M',label:__('Medium', 'dragblock'), value: '20px'},
		// {text:'L',label:__('Large', 'dragblock'), value: '1.125em'},
		{text:'L',label:__('Large', 'dragblock'), value: '36px'},
		{text:'XL',label:__('Extra Large', 'dragblock'), value: '42px'},
		// {text:'XXL',label:__('Extreme Large', 'dragblock'), value: '2em'},
		// {text:'XXXL',label:__('Extra Extreme Large', 'dragblock'), value: '3em'},
	];

	// console.log(value, onChange);

	return (
		<div className='dragblock-font-size-control'>
			<ButtonGroup>
				{
					buttons.map(b=>
						<Button
							variant={(value==b.value) ? 'primary' : ''}
							onClick={()=>{
								onChange(b.value)
							}}
							showTooltip={true}
							tooltipPosition='top center'
							label={b.label}
							tooltipDelay={0}
						>
							{b.text}
						</Button>
					)
				}
			</ButtonGroup>

			<DimensionControl
				value={ value }

				onChange={ ( value ) => {
					onChange(value)
				}}

			/>
		</div>
	)
}