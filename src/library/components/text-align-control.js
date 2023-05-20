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
	SVG, Path,
} from '@wordpress/components';
import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignNone,
	alignRight,
} from '@wordpress/icons';

import DimensionControl from './dimension-control';

export default function TextAlignControl({value, onChange}) {

	const buttons = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},
		{label:__('Default', 'dragblock') ,text: alignNone, value: ''},
		{label:__('Left', 'dragblock') ,text: alignRight, value: 'left'},
		{label:__('Right', 'dragblock') ,text: alignLeft, value: 'right'},
		{label:__('Center', 'dragblock') ,text: alignCenter, value: 'center'},
		{label:__('Justify', 'dragblock') ,text: alignJustify, value: 'justify'},
		
	];

	// console.log(value, onChange);

	return (
		<div className='dragblock-text-align-control'>
			<ButtonGroup>
				{
					buttons.map(b=>
						<Tooltip
							text={b.label}
							delay={0}
							position='top center'
						>
							
								<Button
									variant={(value==b.value) ? 'primary' : ''}
									onClick={()=>{
										onChange(b.value)
									}}
								>
									{b.label}
								</Button>
							
						</Tooltip>
					)
				}
			</ButtonGroup>
		</div>
	)
}