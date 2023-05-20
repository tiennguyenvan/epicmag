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

export default function DisplayControl({value, onChange}) {

	return (
        <SelectControl
            // label="Size"
            value={ value }
            options={  [
				{ value: '', label: __('Default', 'dragblock')},
				{ value: 'none', label: __('None', 'dragblock')},
				{ value: 'block', label: __('Block', 'dragblock')},
				{ value: 'flex', label: __('Flex', 'dragblock')},
				{ value: 'grid', label: __('Grid', 'dragblock')},
				{ value: 'contents', label: __('Contents', 'dragblock')},
				{ value: 'flow-root', label: __('Flow Root', 'dragblock')},
				{ value: 'inline', label: __('Inline', 'dragblock')},
				{ value: 'inline-block', label: __('Inline Block', 'dragblock')},
				{ value: 'inline-flex', label: __('Inline Flex', 'dragblock')},
				{ value: 'inline-grid', label: __('Inline Grid', 'dragblock')},
				{ value: 'inline-table', label: __('Inline Table', 'dragblock')},
				{ value: 'table', label: __('Table', 'dragblock')},
				{ value: 'table-row', label: __('Table Row', 'dragblock')},
				{ value: 'table-cell', label: __('Table Cell', 'dragblock')},
				{ value: 'table-column', label: __('Table Column', 'dragblock')},
				{ value: 'table-column-group', label: __('Table Column Group', 'dragblock')},
				{ value: 'table-caption', label: __('Table Caption', 'dragblock')},
				{ value: 'table-row-group', label: __('Table Row Group', 'dragblock')},
				{ value: 'table-header-group', label: __('Table Header Group', 'dragblock')},
				{ value: 'table-footer-group', label: __('Table Footer Group', 'dragblock')},
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