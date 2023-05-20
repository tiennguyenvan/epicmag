import { __ } from '@wordpress/i18n';
import { 
    Flex, 
    FlexBlock,
    FlexItem, 
    Tooltip,
    Button,
    __experimentalNumberControl as NumberControl ,
    __experimentalUnitControl as UnitControl 
} from "@wordpress/components";
import { useState } from '@wordpress/element';
import DimensionControl from './dimension-control';
import LegendLabel from './label';
import { cloneDeep, isString } from 'lodash';
import AvailableSelectedUnit, { defaultUnits } from './settings';
/**
 * 
 * @param {String|Object} value 'string, ex: 10px' or {'top-left', 'top-right' 'bottom-left', 'bottom-right'}
 * @returns 
 */
export default function BoxControl({ 
    onChange, 
    label, 
    value: valueObj, 
    units,  
    corner,
    unlinkable, /* default: true, if unlinkable is false, we have only the linked button */
    linkable, /* default: true, if linkable is false, we have only the unlinked button */
}) {
    const isLinkedValue = (value) => {
        if (typeof value !== 'object') return true;
        let pre = null;
        for (let v in value) {
            if (null === pre) pre = value[v];
            if (pre != value[v]) return false;
        }
        return true;
    }
    const getLinkedValue = (value) => {
        if (typeof value !== 'object') return '';
        let pre = '';
        for (let v in value) {
            if ('' === pre) pre = value[v];
            if (pre != value[v]) break;
        }

        return pre
    }

    const [isLinked, setIsLinked] = useState(isLinkedValue(valueObj) && linkable !== false);
    const [linkedPlaceholder, setLinkedPlaceholder] = useState('');
    const [linkedValue, setLinkedValue] = useState(getLinkedValue(valueObj));
    const className = 'dragblock-box-control ' + (corner? 'corner' : 'side');
    
    if (!valueObj) {
        // the order here is really important because we can join entries to create css easily
        if (corner) {            
            valueObj = {
                'top-left': '',
                'top-right': '',
                'bottom-right': '',
                'bottom-left': ''
            }
        } else {
            valueObj = {
                top: '',
                right: '',
                bottom: '',
                left: ''
            }
        }
    }


    units = Object.assign({}, defaultUnits, units);
    
	let {availableUnits, selectedUnit} = AvailableSelectedUnit({value: valueObj, units: Object.values(units)});

	if (!availableUnits.length) {
		availableUnits = Object.values(units);
	}

    let unitCtrls = {
        _1: <Tooltip 
                text={corner?__('Top Left', 'dragblock') : __('Top', 'dragblock')} 
                position={corner? 'top left' : 'top center'}
            >
                <div>
                    <UnitControl 
                        className={corner ? 'top-left' : 'top'}
                        onChange={ (value) => {
     
                            if (corner) {
                                valueObj['top-left'] = value;
                            } else {
                                valueObj['top'] = value;
                            }
                            /**
                             * @hack WordPress setAttributes will work only if we provide it a new object with a new address
                             * so we have to create a deep copy if we want to change only the property of the job
                             * https://github.com/WordPress/gutenberg/issues/37967
                             * 
                             * Please set this on the control define so we don't need to set on setAttribute 100 times
                             * if we have 100 controls
                             */
                            onChange(cloneDeep(valueObj));
                        } } 
                        value={ corner ? valueObj['top-left'] : valueObj['top'] }
                        units={ availableUnits }                                                

                        min={ units[ selectedUnit ]
                            ?.min ?? 0 }
                        max={
                            units[ selectedUnit ]
                                ?.max ?? 100
                        }
                        step={
                            units[ selectedUnit ]
                                ?.step ?? 0.1
                        }                                                                               
                    />
                </div>
            </Tooltip>,


        _2: <Tooltip                                         
                text={corner?__('Top Right', 'dragblock') : __('Right', 'dragblock')} 
                position={corner? 'top right' : 'middle right'}
            >
                <div>
                    <UnitControl 
                        className={corner ? 'top-right' : 'right'}
                        onChange={ (value) => {                                                    
                            if (corner) {
                                valueObj['top-right'] = value;
                            } else {
                                valueObj.right = value;
                            }
                            onChange(cloneDeep(valueObj));
                        } } 
                        value={ corner ? valueObj['top-right'] : valueObj.right } 
                        units={ availableUnits }                                                 

                        min={ units[ selectedUnit ]
                            ?.min ?? 0 }
                        max={
                            units[ selectedUnit ]
                                ?.max ?? 100
                        }
                        step={
                            units[ selectedUnit ]
                                ?.step ?? 0.1
                        }                                               
                    />
                </div>
            </Tooltip>,

        _3: <Tooltip 
                text={corner?__('Bottom Left', 'dragblock') : __('Left', 'dragblock')} 
                position={corner? 'bottom left' : 'middle left'}
            >
                <div>
                    <UnitControl 
                        className='bottom-left'
                        onChange={ (value) => {
                            if (corner) {
                                valueObj['bottom-left'] = value;
                            } else {
                                valueObj.left = value;
                            }
                            onChange(cloneDeep(valueObj));
                        } } 
                        value={ corner ? valueObj['bottom-left'] : valueObj.left }
                        units={ availableUnits }                                                 

                        min={ units[ selectedUnit ]
                            ?.min ?? 0 }
                        max={
                            units[ selectedUnit ]
                                ?.max ?? 100
                        }
                        step={
                            units[ selectedUnit ]
                                ?.step ?? 0.1
                        }
                        
                    />
                </div>
            </Tooltip>,

        _4: <Tooltip 
                text={corner?__('Bottom Right', 'dragblock') : __('Bottom', 'dragblock')} 
                position={corner? 'bottom right' : 'bottom center'}
            >
                <div>
                    <UnitControl 
                        className='bottom-right'
                        onChange={ (value) => {
                            if (corner) {
                                valueObj['bottom-right'] = value;
                            } else {
                                valueObj.bottom = value;
                            }
                            onChange(cloneDeep(valueObj));
                        } } 
                        value={ corner ? valueObj['bottom-right'] : valueObj.right }
                        units={ availableUnits }                                                 

                        min={ units[ selectedUnit ]
                            ?.min ?? 0 }
                        max={
                            units[ selectedUnit ]
                                ?.max ?? 100
                        }
                        step={
                            units[ selectedUnit ]
                                ?.step ?? 0.1
                        }
                    
                    />
                </div>
            </Tooltip>,
    }


    return (
        <><div className={className}>
            <LegendLabel>{label}</LegendLabel>

            <Flex align="top">                
                <FlexItem isBlock={true}>
                    {linkable !== false && isLinked && (
                        <FlexBlock>
                            
                            <DimensionControl
                                value={ linkedValue }
                                onChange={ ( value ) => {
                                    /**
                                     * @hack WordPress setAttributes will work only if we provide it a new object with a new address
                                     * so we have to create a deep copy if we want to change only the property of the job
                                     * https://github.com/WordPress/gutenberg/issues/37967
                                     */
                                    if (corner) {
                                        valueObj = {
                                            'top-left': value,
                                            'top-right': value,
                                            'bottom-right': value,
                                            'bottom-left': value
                                        }           
                                    } else {
                                        valueObj = {
                                            top: value,
                                            right: value,
                                            bottom: value,
                                            left: value
                                        }           
                                    }
                                                             
                                    setLinkedValue(value);
                                    // alow to set '' then setAttribute will not save 
                                    // so we can inherit parents' values
                                    onChange(value==='' ? '' : valueObj);
                                    setLinkedPlaceholder('')
                                }}
                                units={ units }
                                placeholder={ linkedPlaceholder }
                            />                             
                        </FlexBlock>
                    )}
                    
                    {unlinkable !== false && !isLinked && (
                        <FlexBlock className='components-box-control-unlinked-container'>
                            <div className='components-box-control-visualizer'></div>   
                            {corner && (
                                <>
                                    <Flex gap={2}>
                                        <FlexBlock>{unitCtrls._1}</FlexBlock>
                                        <FlexBlock>{unitCtrls._2}</FlexBlock>
                                    </Flex>
                                    <Flex gap={2}>
                                        <FlexBlock>{unitCtrls._3}</FlexBlock>
                                        <FlexBlock>{unitCtrls._4}</FlexBlock>
                                    </Flex>
                                </>
                            )}                         
                            {!corner && (
                                <>
                                    <FlexItem>{ unitCtrls._1 }</FlexItem>
                                    <FlexItem>
                                        <Flex>
                                            <FlexItem>{ unitCtrls._2}</FlexItem>
                                            <FlexItem>{ unitCtrls._3 }</FlexItem>                                        
                                        </Flex>
                                    </FlexItem>  

                                    <FlexItem>{ unitCtrls._4 }</FlexItem>
                                </>
                            )}
                        </FlexBlock>
                    )}
                </FlexItem>

                {unlinkable !== false && linkable !== false && (
                    <FlexItem>
                        <Button
                            label={isLinked?__('Unlink Sides', 'dragblock') : __('Link Sides', 'dragblock')}
                            showTooltip={true}
                            tooltipPosition='top'

                            onClick={() => {
                                
                                // check if side values change differently
                                if (!isLinkedValue(valueObj)) {
                                    setLinkedPlaceholder(__('Mixed', 'dragblock'))
                                    setLinkedValue('');
                                } else {
                                    setLinkedValue(getLinkedValue(valueObj))
                                }

                                setIsLinked(!isLinked);
                            }}                     
                        >
                            {isLinked && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>
                            )}
                            {!isLinked && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"></path></svg>
                            )}                                            
                        </Button>
                    </FlexItem>
                )}
                
            </Flex>
        </div></>
    )
}