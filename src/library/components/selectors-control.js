import classnames from 'classnames';
import {__} from '@wordpress/i18n';

import {
    Tooltip
} from '@wordpress/components';



import {TextControl} from '@wordpress/components';
import {Flex} from '@wordpress/components';
import {FlexItem} from '@wordpress/components';
import { cloneDeep } from 'lodash';



export default function SelectorsControl({
    value, 
    onChange, 
    supportedStates,    
    suggestions 
}) {
    let enableStateControl = supportedStates && Object.keys(supportedStates).length > 0;

    if (!value) {
        if (enableStateControl) {
            value = {
                selectors: '',
                states: '',
            }
        } else {
            value = '';
        }
    }
    
    // const states = {
    //     h : __(':hover', 'dragblock'), 
    //     // We temporarily disable this state because we don't see any practical usage at this time
    //     // a : __(':active', 'dragblock'),
    //     f : __(':focus', 'dragblock')
    // }

    // suggestions : classes: [], ids: [], attributes: []


    
	
	return (
        <Flex justify='stretch' gap={0} align='center' className='dragblock-selectors-control'>
            {/* SELECTORS */}
            <Tooltip 
                text={__('.Classname, #ID, selector query. Default: this element', 'dragblock')} 
                delay={0}
                position='top center'
            >
                <FlexItem>
                <TextControl
                    placeholder={__('Selector', 'dragblock')}
                    value={value.selectors}
                    onChange = {(newSelectors) => {                        
                        if (typeof(value) === 'object') {
                            let newValue = cloneDeep(value)
                            newValue['selectors'] = newSelectors;
                            onChange(newValue);    
                        } else {
                            onChange(newSelectors);    
                        }                                                            
                    }}
                />
                </FlexItem>
            </Tooltip>
            {/* STATES */}
            {
                enableStateControl ? (
                    <FlexItem>
                        <Flex justify='stretch' gap={0} className='states'>
                            {
                                Object.entries(supportedStates).map(([stateValue, stateNote]) => {                            
                                    return (<FlexItem>
                                        <Tooltip 
                                            text={stateNote} 
                                            delay={0} 
                                            position='top center'
                                        >
                                            <a className={
                                                    classnames('state-item', {
                                                        'active' : value['states'] && value['states'].indexOf(stateValue) != -1
                                                    })
                                                }
                                                onClick={() => {
                                                    let newValue = cloneDeep(value)
                                                    if (!newValue['states']) newValue['states'] = '';
                                                    if (newValue['states'].indexOf(stateValue) == -1) newValue['states'] += stateValue
                                                    else newValue['states'] = newValue['states'].replace(stateValue, '');                                        

                                                    onChange(newValue);
                                                }}
                                            >
                                                :{stateValue}
                                            </a>
                                        </Tooltip>
                                    </FlexItem>)
                                })
                            }
                        </Flex>
                    </FlexItem>
                ) : 
                
                (
                    <>
                    {/* suggestion box */}

                    </>
                )
            }
            
        </Flex>
    );

}
