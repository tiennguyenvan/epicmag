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

export default function TextTransformControl({value, onChange}) {
	// console.log('FONT SIZE');
	// return (<div>HELLO</div>)	

	const buttons = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},
		{text:'--',label:__('Default', 'dragblock'), value: ''},
		{text:'AB',label:__('Uppercase', 'dragblock'), value: 'uppercase'},
		{text:'ab',label:__('Lowercase', 'dragblock'), value: 'lowercase'},
		{text:'Ab',label:__('Capitalize', 'dragblock'), value: 'capitalize'},		
	];

	// console.log(value, onChange);
	
	return (
		<div className='dragblock-text-transform-control'>
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
								// showTooltip={true}
								// tooltipPosition='top center'
								// label={b.label}
								// tooltipDelay={0}
							>
								{b.text}
							</Button>
						</Tooltip>
					)
				}
			</ButtonGroup>
		</div>
	)
}