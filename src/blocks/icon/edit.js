/**
 * External dependencies
 */
import {isEmpty} from 'lodash';

/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';
import {
	Dropdown, MenuItem,
	NavigableMenu, ToolbarButton,
	ToolbarGroup
} from '@wordpress/components';
import {
	BlockControls, useBlockProps,
	withColors
} from '@wordpress/block-editor';
import {useState} from '@wordpress/element';

/**
 * Internal dependencies
 */
import getIcons from './icons';
import {flattenIconsArray} from './utils/icon-functions';
import {bolt as defaultIcon} from './icons/bolt';
import parseIcon from './utils/parse-icon';
import InserterModal from './inserters/inserter';
import CustomInserterModal from './inserters/custom-inserter';
import IconPlaceholder from './placeholder';


import './editor.scss';


/**
 * The edit function for the Icon Block.
 *
 * @param {Object} props All props passed to this function.
 * @return {WPElement}   Element to render.
 */
export function Edit( props ) {
	const {
		attributes,
		setAttributes,
	} = props;
	const {		
		icon,
		iconName,

	} = attributes;
	// console.log(attributes);

	const [ isInserterOpen, setInserterOpen ] = useState( false );
	const [ isQuickInserterOpen, setQuickInserterOpen ] = useState( false );
	const [ isCustomInserterOpen, setCustomInserterOpen ] = useState( false );	

	const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.filter( ( i ) => i.name === iconName );
	let customIcon = defaultIcon;
	if ( icon && isEmpty( namedIcon ) ) {
		customIcon = parseIcon( icon );

		if ( isEmpty( customIcon?.props ) ) {
			customIcon = defaultIcon;
		}
	}

	let printedIcon = ! isEmpty( namedIcon ) ? namedIcon[ 0 ].icon : customIcon;

	// Icons provided by third-parties are generally strings.
	if ( typeof printedIcon === 'string' ) {
		printedIcon = parseIcon( printedIcon );
	}
	// console.log(icon);

	const blockControls = (
		<>
						
			{ ( icon || iconName ) && (
				<BlockControls>			
					<ToolbarGroup>
						<Dropdown
							renderToggle={ ( { onToggle } ) => (
								<ToolbarButton onClick={ onToggle }>
									{ __( 'Replace' ) }
								</ToolbarButton>
							) }
							renderContent={ ( { onClose } ) => (
								<NavigableMenu>
									<MenuItem
										onClick={ () => {
											setInserterOpen( true );
											onClose( true );
										} }
									>
										{ __(
											'Browse icon library',
											'dragblock'
										) }
									</MenuItem>
									<MenuItem
										onClick={ () => {
											setCustomInserterOpen( true );
											onClose( true );
										} }
									>
										{ __(
											'Add/edit custom icon',
											'dragblock'
										) }
									</MenuItem>
								</NavigableMenu>
							) }
							/>
					</ToolbarGroup>
				</BlockControls>
			) }
		</>
	);


	
	
	const iconMarkup = (
		<>
			{ ! icon && ! iconName ? (
				<IconPlaceholder
					setInserterOpen={ setInserterOpen }
					isQuickInserterOpen={ isQuickInserterOpen }
					setQuickInserterOpen={ setQuickInserterOpen }
					isCustomInserterOpen={ isCustomInserterOpen }
					setCustomInserterOpen={ setCustomInserterOpen }
					setAttributes={ setAttributes }
					enableCustomIcons={ true }
				/>
			) : (
				
				<>
					{ printedIcon }
				</>
			) }
		</>
	);

	// this is where we return the real element for the editor
	return (
		<>
			{ blockControls }			
			{/* <span { ...useBlockProps( {
					className:
						itemsJustification &&
						`items-justified-${ itemsJustification }`,
					ref,
					onKeyDown,
				} ) }
				// This is a bit of a hack. we only want the margin styles
				// applied to the main block div.
				style={ blockMargin }
			>
				{ iconMarkup }
			</span> */}
			<span { ...useBlockProps() }>{ iconMarkup }</span>
			<InserterModal
				isInserterOpen={ isInserterOpen }
				setInserterOpen={ setInserterOpen }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>			
			<CustomInserterModal
				isCustomInserterOpen={ isCustomInserterOpen }
				setCustomInserterOpen={ setCustomInserterOpen }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
}

const iconColorAttributes = {
	iconColor: 'icon-color',
	iconBackgroundColor: 'icon-background-color',
};

export default withColors( iconColorAttributes )( Edit );
