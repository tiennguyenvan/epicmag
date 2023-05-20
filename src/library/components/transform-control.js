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
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components'

import DimensionControl from './dimension-control';
import BorderStyleControl from './border-style-control';
import {dragBlockShadowValue} from '../ultils/styling'
import {Spinner} from '@wordpress/components';

export default function TransformControl({value, onChange, colors}) {

	if (typeof(value) == 'undefined') value = '';
	
	let func = value.split('(')[0];
	value = value.replace('(', '').replace(')', '').replace(func, '').split(',');

	let currentAngle = value[0] ? parseInt(value[0]) : '';
	if (isNaN(currentAngle)) {
		currentAngle = ''
	} else {		
		if (currentAngle < 0) {
			currentAngle = 360 + currentAngle % 360;
		} else {
			currentAngle = currentAngle % 360;
		}
	}
	
	return (		
		<div className='dragblock-transform-control'>

			<SelectControl
				value={func}
				options={[
					{ value: '', label: __('Default', 'dragblock')},
					{ value: 'none', label: __('None', 'dragblock')},
					// { value: 'matrix', label: __('matrix', 'dragblock')},
					// { value: 'matrix3d', label: __('matrix3d', 'dragblock')},
					// { value: 'perspective', label: __('Perspective', 'dragblock')},
					{ value: 'rotate', label: __('Rotate', 'dragblock')},
					// { value: 'rotate3d', label: __('Rotate3d', 'dragblock')},
					{ value: 'rotateX', label: __('RotateX', 'dragblock')},
					{ value: 'rotateY', label: __('RotateY', 'dragblock')},
					{ value: 'rotateZ', label: __('RotateZ', 'dragblock')},
					// { value: 'translate', label: __('Translate', 'dragblock')},
					// { value: 'translate3d', label: __('Translate3d', 'dragblock')},
					// { value: 'translateX', label: __('TranslateX', 'dragblock')},
					// { value: 'translateY', label: __('TranslateY', 'dragblock')},
					// { value: 'translateZ', label: __('TranslateZ', 'dragblock')},
					{ value: 'scale', label: __('Scale', 'dragblock')},
					// { value: 'scale3d', label: __('Scale3d', 'dragblock')},
					{ value: 'scaleX', label: __('ScaleX', 'dragblock')},
					{ value: 'scaleY', label: __('ScaleY', 'dragblock')},
					{ value: 'scaleZ', label: __('ScaleZ', 'dragblock')},
					// { value: 'skew', label: __('Skew', 'dragblock')},
					// { value: 'skewX', label: __('SkewX', 'dragblock')},
					// { value: 'skewY', label: __('SkewY', 'dragblock')},
				]}
				onChange={(newFunc) => {
					// validate value
					if (['rotate', 'rotateX', 'rotateY', 'rotateZ'].includes(newFunc)) {
						let val = value[0] ? parseInt(value[0]) : 0;
						if (val < 0) val = 0
						if (val > 360) val = value % 360
						
						onChange(newFunc+'('+val+'deg)');
					} 
					else if (['scale', 'scaleX', 'scaleY', 'scaleZ'].includes(newFunc)) {
						let val = value[0] ? parseInt(value[0]) : 0;
						if (val < 0) val = 0
						if (val > 3) val = 3						
						onChange(newFunc+'('+val+')');
					} 
					else {
						onChange(newFunc+'('+value.join(',')+')');
					}
					
				}}
			/>
			{['rotate', 'rotateX', 'rotateY', 'rotateZ'].includes(func)  && (
				<Tooltip
					text={__('Angle', 'dragblock')}
					position='middle left'
					delay={0}
				>	
					<div>
						<NumberControl
							value={ currentAngle }
							min={0}
							max={360}
							step={1}
							onChange={ ( angle ) => {
								onChange(func+'('+angle+'deg)')
							}}
						/>
					</div>
				</Tooltip>
			)}

			{['scale', 'scaleX', 'scaleY', 'scaleZ'].includes(func)  && (
				<Tooltip
					text={__('Ratio', 'dragblock')}
					position='middle left'
					delay={0}
				>	<div>
					<NumberControl
						value={ value[0] }
						min={0}
						max={3}
						step={0.1}
						onChange={ ( ratio ) => {
							onChange(func+'('+ratio+')')
						}}
					/>
					</div>	
				</Tooltip>
			)}						
		</div>
	)
}