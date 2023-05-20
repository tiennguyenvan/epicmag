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
	Flex, 
    FlexBlock,
    FlexItem, 
} from '@wordpress/components'

import DimensionControl from './dimension-control';
import TextDecorationLineControl from './text-decoration-line-control';
import TextDecorationStyleControl from './text-decoration-style-control';

export default function TextDecorationControl({value, onChange, colors}) {

	if (typeof(value) == 'undefined') value = '';
	let color = value.split(' ').map(e=>e.indexOf('#') != -1 ? e : '').join(' ').trim();

	const lines = [
		// {text:'XXS',label:__('Extreme Small'), value: 'xx-small'},		
		'underline overline', 'underline line-through', 'underline', 'overline', 'line-through', 'none'
	];

	let line = '';
	for (let l of lines) {
		if (value.indexOf(l) != -1) {
			line = l;
			break;
		}
	}
	
	const styles = [
		'solid', 'double', 'dotted', 'dashed', 'wavy'		
	];
	let style = '';
	for (let s of styles) {
		if (value.indexOf(s) != -1) {
			style = s;
			break;
		}
	}


	let thick = value.replace(color, '').replace(line, '').replace(style, '').trim();	

	return (
		<div className='dragblock-text-decoration-control'>		
			<TextDecorationLineControl
				value={line}
				onChange={(newLine) => {
					
					if (line) {
						value = value.replace(line, newLine);
					} else {
						value += (value ? ' ' : '') + newLine;
					}
					
					
					onChange(value);
				}}
			/>
			{line ? (
				<TextDecorationStyleControl
				value={style}
				onChange={(newStyle) => {
					if (style) {
						value = value.replace(style, newStyle);
					} else {
						value += (value ? ' ' : '') +newStyle;
					}
					
					onChange(value);
				}}
			/>
			) : null}
			
			{style? (
				<>
				<DimensionControl
					value={thick}
					onChange={(newThick) => {
						if (thick) {
							value = value.replace(thick, newThick);
						} else {
							value += (value ? ' ' : '') + newThick;
						}
						
						onChange(value);
					}}

				/>	

				{/* @fixme: cannot add this control at this place */}
				{/* <ColorPalette
					enableAlpha={true}
					colors={colors}
					value={color}
					onChange={(newColor) => {
						if (color) {
							value = value.replace(color, newColor);
						} else {
							value += newColor;
						}
						
						onChange(value);

						
					}}
				/> */}
				<PanelColorGradientSettings
					enableAlpha={ true }
					settings={[
						{   colorValue:  color,
							onColorChange:(newColor) => {
								// console.log('Before set', value, color, newColor)
								if (color)  {
									value = value.replace(color, newColor);
								} else {
									value += (value ? ' ' : '') + newColor;
								}
								// console.log('After set', value)
								
								onChange(value);
			
								
							},
							label: __( 'Line Color', 'dragblock' ),
						},
					]}
					__experimentalHasMultipleOrigins={ true }
				>                        
				</PanelColorGradientSettings>
				</>
			) : null}
			
		</div>
	)
}