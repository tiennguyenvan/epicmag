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

export default function LineHeightControl({value, onChange}) {

	const buttons = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},
		{text:__('Default', 'dragblock') ,label: '', value: ''},
		{text:__('Single', 'dragblock') ,label: '', value: '1em'},
		{text:'1.15',label: '', value: '1.15em'},
		{text:'1.5',label: '', value: '1.5em'},
		{text:__('Double', 'dragblock'), label:__(''), value: '2em'},
	];

	// console.log(value, onChange);

	return (
		<div className='dragblock-line-height-control'>
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