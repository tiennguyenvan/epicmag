


import { useSetting } from '@wordpress/block-editor';
import { intersection } from 'lodash';
import { useMemo } from '@wordpress/element';
import {	
	__experimentalSpacer as Spacer, // eslint-disable-line
	__experimentalUseCustomUnits as useCustomUnits, // eslint-disable-line
	__experimentalUnitControl as UnitControl, // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, // eslint-disable-line
} from '@wordpress/components';

export const defaultUnits = {
    px: { value: 'px',  label: 'px',    default: 0,     max: 200,  step: 1 },
    '%': { value: '%',   label: '%',     default: 10,    max: 100,  step: 1 },
    em: { value: 'em',  label: 'em',    default: 0,     max: 50,    step: 0.1 },
    rem: { value: 'rem', label: 'rem',   default: 0,     max: 50,    step: 0.1 },
    vw: { value: 'vw',  label: 'vw',    default: 0,     max: 100,   step: 1 },
    vh: { value: 'vh',  label: 'vh',    default: 0,     max: 100,   step: 1 },
};


/**
 * Reduce the number of units available (if defined in theme.json)
 * @param {*} props 
 * @returns 
 */
export default function AvailableSelectedUnit(props) {
    const {units, value} = props;    
    const themeJsonUnits = useSetting( 'spacing.units' );
    
	let defaultUnits;

	if ( units && themeJsonUnits ) {
		defaultUnits = intersection( units, themeJsonUnits );
	} else {
		defaultUnits = units || themeJsonUnits;
	}

	const availableUnits = useCustomUnits( {
		availableUnits: defaultUnits || [ '%', 'px', 'em', 'rem', 'vh', 'vw' ],
	} );

	const selectedUnit =
		useMemo(
			() => parseQuantityAndUnitFromRawValue( value ),
			[ value ]
		)[ 1 ] ||
		availableUnits[ 0 ]?.value ||
		'px';

    return {availableUnits: availableUnits, selectedUnit: selectedUnit }
}