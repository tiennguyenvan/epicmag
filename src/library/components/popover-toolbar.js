////////////////////////////////////////////////////////////////
// Custom Drop Down Toolbar Component
////////////////////////////////////////////////////////////////      
import classnames from 'classnames';
import {ToolbarButton} from '@wordpress/components';
import {Dropdown} from '@wordpress/components';
import {NavigableMenu} from '@wordpress/components';
import {MenuItem} from '@wordpress/components';
import {Popover} from '@wordpress/components';
import {
    close
} from '@wordpress/icons'
import { useState } from '@wordpress/element';

export default function PopoverToolbar ({            
    children,
    icon,    
    label,
}) {

    const [isPopoverToolbarOpen, setPopoverToolbarOpen] = useState(false);
    const closePopoverToolbar = () => {
        setPopoverToolbarOpen(false);
    }
    const openPopoverToolbar = () => {
        setPopoverToolbarOpen(true);
    }



    return (
        <>
            <ToolbarButton onClick={openPopoverToolbar} icon={icon} label={label} tooltipPosition='top center'/>
            {isPopoverToolbarOpen && (
                <Popover
                    className='dragblock-toolbar-popover'
                    onFocusOutside={closePopoverToolbar}
                    onClose={closePopoverToolbar}
                    // onMouseLeave={closePopoverToolbar}
                >
                    {children}
                </Popover>
            )}
        </>
    );
}