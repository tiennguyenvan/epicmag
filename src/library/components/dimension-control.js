/**
 * External dependencies
 */
import { intersection } from 'lodash';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	BaseControl,
	RangeControl,
	Flex,
	FlexItem,
	__experimentalSpacer as Spacer, // eslint-disable-line
	__experimentalUseCustomUnits as useCustomUnits, // eslint-disable-line
	__experimentalUnitControl as UnitControl, // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, // eslint-disable-line
} from '@wordpress/components';
import { useSetting } from '@wordpress/block-editor';

import AvailableSelectedUnit, { defaultUnits } from './settings';
import LegendLabel from './label';

export default function DimensionControl({ onChange, label, value, placeholder, units }) {

	const rangeValue = (value !== '' ? parseFloat(value) : 0);

	// convert units array to object
	// if using an array, force to use it without merging with the defaults
	const isForceUnits = (Array.isArray(units));
	if (isForceUnits) {
		let temp = units;
		units = new Object();
		for (let u of temp) {
			units[u['value']] = u;
		}
	}
	// console.log(units)	
	if (!isForceUnits || !units) {
		units = Object.assign({}, defaultUnits, units);
	}
	

	let { availableUnits, selectedUnit } = AvailableSelectedUnit({ value, units: Object.values(units) });

	if (!availableUnits.length) {
		availableUnits = Object.values(units);
	}

	const handleSliderChange = (next) => {
		onChange([next, selectedUnit].join(''));
	};

	const handleChange = (unitValue) => {
		// // Prevent the unit from getting returned if there is no actual value set.
		// const [ newValue, newUnit ] = // eslint-disable-line
		// 	parseQuantityAndUnitFromRawValue( unitValue );
		// if ( newValue ) {
		onChange(unitValue);
		// }
	};

	const handleUnitChange = (newUnit) => {
		// Attempt to smooth over differences between currentUnit and newUnit.
		// This should slightly improve the experience of switching between unit types.
		const [currentValue, currentUnit] =
			parseQuantityAndUnitFromRawValue(value);

		if (['em', 'rem'].includes(newUnit) && currentUnit === 'px') {
			// Convert pixel value to an approximate of the new unit, assuming a root size of 16px.
			onChange((currentValue / 16).toFixed(2) + newUnit);
		} else if (
			['em', 'rem'].includes(currentUnit) &&
			newUnit === 'px'
		) {
			// Convert to pixel value assuming a root size of 16px.
			onChange(Math.round(currentValue * 16) + newUnit);
		} else if (
			['vh', 'vw', '%'].includes(newUnit) &&
			currentValue > 100
		) {
			// When converting to `vh`, `vw`, or `%` units, cap the new value at 100.
			onChange(100 + newUnit);
		}
	};

	return (
		<fieldset className="dragblock-dimension-control">

			<LegendLabel>
				{label}
			</LegendLabel>
			<Flex>
				<FlexItem isBlock>
					<UnitControl
						value={value}
						units={availableUnits}
						onChange={handleChange}
						onUnitChange={handleUnitChange}
						// isPressEnterToChange={true}
						min={units[selectedUnit]
							?.min ?? 0}
						max={
							units[selectedUnit]
								?.max ?? 100
						}
						step={
							units[selectedUnit]
								?.step ?? 0.1
						}
						// size={ '__unstable-large' }
						placeholder={placeholder}
					/>
				</FlexItem>
				<FlexItem isBlock>
					<Spacer marginX={2} marginBottom={0}>
						<RangeControl
							value={rangeValue}
							min={units[selectedUnit]
								?.min ?? 0}
							max={
								units[selectedUnit]
									?.max ?? 100
							}
							step={
								units[selectedUnit]
									?.step ?? 0.1
							}
							withInputField={false}
							onChange={handleSliderChange}
							__nextHasNoMarginBottom
						/>
					</Spacer>
				</FlexItem>
			</Flex>
		</fieldset>
	);
}
