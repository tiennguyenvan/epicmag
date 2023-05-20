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


export default function TextShadowControl({value, onChange, colors}) {

	if (typeof(value) == 'undefined') value = '';
	let color = '';
	let offsetX = '';
	let offsetY = '';
	let blurRadius = '';
	
	value.trim().split(' ').map(e=> {
		if (e.indexOf('#') != -1) color = e.trim();
	})
	value = value.trim().replace(color, '').split(' ');

	offsetX = value[0]
	if (value.length > 1) offsetY = value[1]
	if (value.length > 2) blurRadius = value[2]
	
	if (!offsetX) offsetX = '0px';
	if (!offsetY) offsetY = '0px';
	return (		
		<div className='dragblock-text-shadow-control'>
			<Tooltip
				text={__('Horizontal', 'dragblock')}
				position='middle left'
				delay={0}
			>
				<div>
					<DimensionControl
						value={ offsetX }
						placeholder = 'X'
						units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
						onChange={ ( newX ) => {								
							let newValue = newX + (offsetY ? ' ' + offsetY : '');
							if (newX && offsetY) {
								newValue += (blurRadius ? ' ' + blurRadius : '') + (color ? ' ' + color : '')
							}

							onChange(newValue);					
						}}
					/>
				</div>
			</Tooltip>

			<Tooltip
				text={__('Vertical', 'dragblock')}
				position='middle left'
				delay={0}
			>
				<div>
					<DimensionControl
						value={ offsetY }
						placeholder = 'Y'
						units = {{px: {value: 'px', label: 'px', min: -50, max: 50, step: 1, default: 0}}}
						onChange={ ( newY ) => {								
							let newValue = offsetX + (newY ? ' ' + newY : '');						
							if (offsetX && newY) {
								newValue += (blurRadius ? ' ' + blurRadius : '') + (color ? ' ' + color : '')
							}

							onChange(newValue);
						}}
					/>
				</div>
			</Tooltip>

			{(offsetX && offsetY) && (

				<>
					<Tooltip
						text={__('Blur', 'dragblock')}
						position='middle left'
						delay={0}
					>
						<div>
						<DimensionControl
							value={ blurRadius }
							placeholder = {__('Blur', 'dragblock')}
							units = {{px: {value: 'px', label: 'px', min: 0, max: 50, step: 1, default: 0}}}
							onChange={ ( newBlur ) => {	
								let newValue = offsetX + ' ' + offsetY + (newBlur ? ' ' + newBlur : '') + (color ? ' ' + color : '');
								onChange(newValue);
							}}
						/>
						</div>
					</Tooltip>
					<PanelColorGradientSettings
						enableAlpha={ true }
						settings={[
							{   
								colorValue:  color,
								onColorChange:(newColor) => {
									let newValue = offsetX + ' ' + offsetY + (blurRadius ? ' ' + blurRadius : '') + (newColor ? ' ' + newColor : '');
									onChange(newValue);
								},
								label: __( 'Shadow Color', 'dragblock' ),
							},
						]}
						__experimentalHasMultipleOrigins={ true }
					>
					</PanelColorGradientSettings>


				</>
			)}
		</div>
	)
}