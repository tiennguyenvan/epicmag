/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Placeholder, Button } from '@wordpress/components';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { bolt, boltPlaceholder } from './icons/bolt';
import { QuickInserterPopover } from './inserters/quick-inserter';
import { sparkles } from './icons/wordpress/temp'
import {Flex} from '@wordpress/components';
import {FlexItem} from '@wordpress/components';
export default function IconPlaceholder( props ) {
	const {
		setInserterOpen,
		isQuickInserterOpen,
		setQuickInserterOpen,
		setCustomInserterOpen,
		setAttributes,
		enableCustomIcons,
	} = props;

	const instructions = enableCustomIcons
		? __(
				'Choose an icon from the library or add your own custom SVG graphic.',
				'dragblock'
		  )
		: __(
				'Browse the icon library and choose one to insert.',
				'dragblock'
		  );

	return (
		<Placeholder
			className="has-illustration"
			// icon={ bolt }
			// label={ __( 'Icon' ) }
			// instructions={ instructions }
		>
			<Icon
				className="components-placeholder__illustration"
				icon={ sparkles }
			/>
			<div>
			<Button isPrimary onClick={ () => setQuickInserterOpen( true ) } icon={sparkles} isSmall={true}>
				{ __( 'Browse', 'dragblock' ) }
			</Button>
			<QuickInserterPopover
				setInserterOpen={ setInserterOpen }
				isQuickInserterOpen={ isQuickInserterOpen }
				setQuickInserterOpen={ setQuickInserterOpen }
				setAttributes={ setAttributes }
			/>			
			</div>		
			
			{ enableCustomIcons && (
			
					<Button
						isTertiary
						onClick={ () => setCustomInserterOpen( true ) }
						isSmall={true}
					>
						{ __( 'Import', 'dragblock' ) }
					</Button>
			
			) }
			
			
			
		</Placeholder>
	);
}
