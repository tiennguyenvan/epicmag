/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue } from '@wordpress/components'; // eslint-disable-line
import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles, // eslint-disable-line
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import getIcons from './icons';
import { flattenIconsArray } from './utils/icon-functions';
import parseIcon from './utils/parse-icon';

/**
 * The save function for the Icon Block.
 *
 * @param {Object} props All props passed to this function.
 * @return {WPElement}   Element to render.
 */
export default function Save( props ) {
	const {
		icon,		
		iconName,
	} = props.attributes;

	// If there is no icon and no iconName, don't save anything.
	if ( ! icon && ! iconName ) {
		return null;
	}

	const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.filter( ( i ) => i.name === iconName );
	let printedIcon = '';

	if ( icon && isEmpty( namedIcon ) ) {
		// Custom icons are strings and need to be parsed.
		printedIcon = parseIcon( icon );		
		
		

		// if ( isEmpty( printedIcon?.props ) ) {
		// 	printedIcon = '';
		// }
	} else {
		// Icon choosen from library.
		printedIcon = namedIcon[ 0 ]?.icon;

		// Icons provided by third-parties are generally strings.
		if ( typeof printedIcon === 'string' ) {
			printedIcon = parseIcon( printedIcon );
		}
	}

	// If there is no valid SVG icon, don't save anything.
	if ( ! printedIcon ) {		
		return null;
	}

	return (
		<span { ...useBlockProps.save() }>	
			{ printedIcon }
		</span>
	)
}
