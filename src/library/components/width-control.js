import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose'
import { useState } from '@wordpress/element'

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
import { 
    InspectorAdvancedControls, 
    InspectorControls, 
    useSetting,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,    
} from '@wordpress/block-editor'

import DimensionControl from './dimension-control';

export default function WidthControl({value, onChange}) {
	const contentSize = useSetting('layout.contentSize');
    const wideSize = useSetting('layout.wideSize');
	// console.log(contentSize, wideSize)

	const buttons_1 = [		
		{text:__('Default', 'dragblock'), value: ''},
		{text:__('Content', 'dragblock'), value: contentSize},
		{text:__('Wide', 'dragblock'), value: wideSize},
		{text:__('100%', 'dragblock'), value: '100%'},		
		{text:__('Auto', 'dragblock'), value: 'auto'},		
	];


	const [widthNumerator, setWidthNumerator] = useState(0);
    const [widthDenominator, setWidthDenominator] = useState(0);

	let widthLayoutControls = []
	for (let denominator = 2; denominator < 7; denominator++) {
		let controlItems = [];
		for (let i = 0; i < denominator; i++) {
			controlItems.push(
				<span className={classnames('item', {'is-active' : (widthNumerator > i)})} onMouseEnter={()=>{setWidthNumerator(i+1)}}></span>
			)
		}
		widthLayoutControls.push(
			<div className={classnames('components-layout-control', {'is-active': (widthDenominator == denominator)})}
				onMouseEnter={()=> {setWidthDenominator(denominator)}}                                                                
			>
				{/* <div className='label'>{					
					<>{denominator} {__(' columns', 'dragblock')}</>
				}</div> */}
				<Tooltip text={widthNumerator + '/' + widthDenominator} delay={0} position='bottom center'><div className='items' onMouseDown={() => {
					let value = (100 * widthNumerator/widthDenominator).toFixed(2)+'%'
					onChange(value);
				}}>
					{controlItems.map(e=>e)}
				</div></Tooltip>
			</div>
		)
	}

	return (
		<div className='dragblock-width-control'>
			<ButtonGroup>
				{
					buttons_1.map(b=>
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
				units = {{px: {value: 'px', label: 'px', min: 0, max:3000, step: 1, default: 0}}} 
				onChange={ ( value ) => {
					onChange(value)
				}}
			/>

			{/* <div className='width-layouts'>{widthLayoutControls.map(e=>e)}</div> */}
		</div>
	)
}