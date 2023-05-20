////////////////////////////////////////////////////////////////
// Custom Drop Down Toolbar Component
////////////////////////////////////////////////////////////////      
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Popover, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { cloneDeep } from 'lodash';

export default function PopoverProperty({
    children,
    className,
    onClose,
    onAction,
    onMouseLeave,
    onKeyDown,
    actions,
    title,
    disabled, // is this property disabled    
    list, // the list of properties
    index, // current index of the property in the property list
    position,
}) {

    if (!onClose) onClose = () => { };
    if (!onMouseLeave) onMouseLeave = () => { };
    if (!onKeyDown) onKeyDown = () => { };

    // for all blocks        
    actions = Object.assign({}, {
        top: true,
        bottom: true,
        up: true,
        down: true,
        duplicate: true,
        disable: true,
        delete: true,
    }, actions);

    return (
        <>
            <Popover
                focusOnMount={false}
                position={position ? position : 'bottom center'}
                className={'dragblock-property-popover' + (className ? ' ' + className : '')}
                onFocusOutside={onClose}
                onClose={onClose}
                onMouseLeave={onMouseLeave}
                // onKeyDown={(event) => {
                //     if (event.key === 'Escape' || event.key === 'Enter') {
                //         onClose();
                //     }
                // }}
                onKeyDown={onKeyDown}
            >

                {/*
                --------------------------------------------------------------------
                POPOVER TITLE >>>>>>>>>>>>>
                --------------------------------------------------------------------
                */}
                <div className='actions'>

                    {/* MOVE FRONT */}

                    {actions.top ? (
                        <Tooltip
                            delay={0}
                            text={__('Move Top', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action front', { 'disabled': (index == 0) })}
                                onClick={() => {
                                    if (index == 0 || !Array.isArray(list)) return;
                                    let newList = cloneDeep(list)
                                    let temp = cloneDeep(newList[index])

                                    newList.splice(index, 1)
                                    newList.unshift(temp);
                                    onAction('top', newList);
                                }}
                            >
                                <svg style={{ transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 12c0 3.6 2.4 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.5 0-4.5-1.5-4.5-4s2-4.5 4.5-4.5h3.5V6H8c-3.6 0-6 2.4-6 6zm19.5-1h-8v1.5h8V11zm0 5h-8v1.5h8V16zm0-10h-8v1.5h8V6z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}

                    {/* MOVE BACK */}

                    {actions.bottom ? (
                        <Tooltip
                            delay={0}
                            text={__('Move Bottom', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action back', { 'disabled': (index == list.length - 1) })}
                                onClick={() => {
                                    if (index == list.length - 1 || !Array.isArray(list)) return;
                                    let newList = cloneDeep(list)
                                    let temp = cloneDeep(newList[index])
                                    newList.splice(index, 1)
                                    newList.push(temp);
                                    onAction('bottom', newList);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 12c0 3.6 2.4 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.5 0-4.5-1.5-4.5-4s2-4.5 4.5-4.5h3.5V6H8c-3.6 0-6 2.4-6 6zm19.5-1h-8v1.5h8V11zm0 5h-8v1.5h8V16zm0-10h-8v1.5h8V6z"></path></svg>
                            </a>
                        </Tooltip>

                    ) : null}

                    {/* MOVE UP */}

                    {actions.up ? (
                        <Tooltip
                            delay={0}
                            text={__('Move Up', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action up', { 'disabled': (index == 0) })}
                                onClick={() => {
                                    if (index == 0 || !Array.isArray(list)) return;
                                    let newList = cloneDeep(list)
                                    let temp = cloneDeep(newList[index])
                                    newList[index] = newList[index - 1]
                                    newList[index - 1] = temp;
                                    onAction('up', newList);
                                }}
                            >
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}


                    {/* MOVE DOWN */}
                    {actions.down ? (
                        <Tooltip
                            delay={0}
                            text={__('Move Down', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className={classnames('action down', { 'disabled': (index == list.length - 1) })}
                                onClick={() => {
                                    if (index == list.length - 1 || !Array.isArray(list)) return;
                                    let newList = cloneDeep(list)
                                    let temp = cloneDeep(newList[index])
                                    newList[index] = newList[index + 1]
                                    newList[index + 1] = temp;
                                    onAction('down', newList);
                                }}
                            >
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
                            </a>
                        </Tooltip>

                    ) : null}

                    {/* DUPLICATE */}
                    {actions.duplicate ? (
                        <Tooltip
                            delay={0}
                            text={__('Duplicate', 'dragblock')}
                            position='top center'
                        >
                            <a
                                className='action duplicate'
                                onClick={() => {
                                    if (!Array.isArray(list)) {
                                        return;
                                    }
                                    let newList = cloneDeep(list)
                                    newList.unshift(cloneDeep(newList[index]))
                                    onAction('duplicate', newList);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 13.8h6v-1.5H7v1.5zM18 16V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zM5.5 16V4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5zM7 10.5h8V9H7v1.5zm0-3.3h8V5.8H7v1.4zM20.2 6v13c0 .7-.6 1.2-1.2 1.2H8v1.5h11c1.5 0 2.7-1.2 2.7-2.8V6h-1.5z"></path></svg>
                            </a>
                        </Tooltip>

                    ) : null}


                    {/* DISABLE / ENABLE */}

                    {actions.disable ? (
                        <Tooltip
                            delay={0}
                            text={(!!disabled ? __('Enable', 'dragblock') : __('Disable', 'dragblock'))}
                            position='top center'
                        >
                            <a className={classnames('action visibility', {
                                'disabled': !!disabled
                            })}
                                onClick={() => {
                                    if (!Array.isArray(list)) {
                                        return
                                    }
                                    let newList = cloneDeep(list)
                                    onAction('disable', newList);
                                }}
                            >
                                {!!disabled ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" /></svg>
                                )}
                            </a>
                        </Tooltip>
                    ) : null}

                    {/* DELETE */}
                    {actions.delete ? (
                        <Tooltip
                            delay={0}
                            text={__('Delete', 'dragblock')}
                            position='top center'

                        >
                            <a
                                className='action delete'
                                onClick={() => {

                                    let newList = cloneDeep(list)                                    
                                    if (Array.isArray(list)) {
                                        newList.splice(index, 1)
                                    } else if (typeof(list) == 'object') {
                                        delete newList[index]
                                    }
                                    onAction('delete', newList);
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 5h-5.7c0-1.3-1-2.3-2.3-2.3S9.7 3.7 9.7 5H4v2h1.5v.3l1.7 11.1c.1 1 1 1.7 2 1.7h5.7c1 0 1.8-.7 2-1.7l1.7-11.1V7H20V5zm-3.2 2l-1.7 11.1c0 .1-.1.2-.3.2H9.1c-.1 0-.3-.1-.3-.2L7.2 7h9.6z"></path></svg>
                            </a>
                        </Tooltip>
                    ) : null}


                    {/* Close */}
                    <Tooltip
                        delay={0}
                        text={__('Close', 'dragblock')}
                        position='top center'

                    >
                        <a className='action close' onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>
                        </a>
                    </Tooltip>
                </div>


                {/*
                --------------------------------------------------------------------
                POPOVER TITLE >>>>>>>>>>>>>
                --------------------------------------------------------------------
                */}
                {
                    title ? (
                        <div className='title'>
                            {title}
                        </div>
                    ) : null
                }

                {/* 
                --------------------------------------------------------------------
                POPOVER Content >>>>>>>>>>>>>
                --------------------------------------------------------------------
                */}
                {children ? (
                    <div className='content'>{children}</div>
                ) : null}
            </Popover>

        </>
    );
}