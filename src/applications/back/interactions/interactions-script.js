
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element'
import {
	useSetting
} from '@wordpress/block-editor';
import { cloneDeep } from 'lodash';
import body from '@wordpress/components/build/panel/body';



const compileAction = (target, action, value) => {
	// toggle action
	let trimedValue = value.replaceAll('.', '').replaceAll('#', '').trim();
	let compliedCode = '';
	switch (action) {
		case 'toggleClass':
			compliedCode += `${target}.classList.toggle('${trimedValue}');`;
			break;
		case 'toggleId':
			compliedCode += `if(${target}.id!=='${trimedValue}'){${target}.id='${trimedValue}'}else{${target}.id=''}`;
			break;

		case 'addClass':
			compliedCode += `${target}.classList.add('${trimedValue}');`;
			break;

		case 'addId':
			compliedCode += `${target}.id='${trimedValue}';`;
			break;


		case 'removeClass':
			compliedCode += `${target}.classList.remove('${trimedValue}');`;
			break;

		case 'removeId':
			compliedCode += `if(${target}.id!=='${trimedValue}'){${target}.id=''}`;
			break;

	}
	/**
	 * Atributes
	 */
	// compliedCode += `if(button.hasAttribute('${trimedValue}')){button.removeAttribute('${trimedValue}')}else{button.setAttribute('${trimedValue}','')}`;
	// compliedCode += `button.setAttribute('${trimedValue}','')`;
	// compliedCode += `button.removeAttribute('${trimedValue}')`;

	return compliedCode;
}

/**
 * 
 * @param {*} trigger 
 * @param {*} save_selector 
 * @returns 
 */
const compileTriggers = (trigger, save_selector) => {
	const {
		slug, // multiple triggers could have the same slug
		eventSource,
		condName,
		condValue1,
		condTarget1,
		thenActName,
		thenActTarget,
		thenActValue,
		elseActName,
		elseActTarget,
		elseActValue,
		disabled
	} = trigger

	let eventSourceSelector = (eventSource || save_selector);
	let condTarget1Selector = (condTarget1 || save_selector);
	let thenActTargetSelector = (thenActTarget || save_selector);
	let elseActTargetSelector = (elseActTarget || save_selector);

	let saveCode = '';
	let condCode = '';
	let thenActCode = '';
	let elseActCode = '';

	// check conditions
	if (condName && condName === 'is' && condValue1) {
		let target = 'this';
		if (condTarget1Selector != eventSourceSelector) {
			target = 'condTarget';
			condCode += `let ${target}=document.querySelector('${condTarget1Selector}');`;
		}
		condCode += `if(${target}&&${target}.matches('${condValue1}')`;
		// console.log('condCode', condCode);
	}

	// check then action
	if (thenActName && thenActValue) {
		let target = 'this';
		if (thenActTargetSelector != eventSourceSelector) {
			target = 'thenActTarget';
			thenActCode += `let ${target}=document.querySelector('${thenActTargetSelector}');`;
			thenActCode += `if(${target}){`;

		}

		thenActCode += compileAction(target, thenActName, thenActValue);

		if (target != 'this') {
			thenActCode += '}';
		}

		// console.log('thenActCode', thenActCode);
	}

	// check else action
	if (elseActName && elseActValue) {
		let target = 'this';
		if (elseActTargetSelector != eventSourceSelector) {
			target = 'elseActTarget';
			elseActCode += `let ${target}=document.querySelector('${elseActTargetSelector}');`;
			elseActCode += `if(${target}){`;

		}

		elseActCode += compileAction(target, elseActName, elseActValue);

		if (target != 'this') {
			elseActCode += '}';
		}

		// console.log('elseActCode', elseActCode);
	}


	// compute the final code
	if (condCode) saveCode += condCode + '{' + thenActCode + '}'
	else saveCode += thenActCode
	if (condCode && elseActCode) saveCode += 'else {' + elseActCode + '}';

	return saveCode;
}


/**
 * 
 * @param {*} props 
 * @returns 
 */
export function dragBlockInteractionsJS(props) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	let { dragBlockScripts, dragBlockClientId, dragBlockJS } = attributes;

	// if the script is empty, then the JS should be empty as well
	if (!dragBlockScripts || dragBlockScripts.length === 0) {
		if (dragBlockJS) {
			setAttributes({ dragBlockJS: '' });
		}
		return;
	}


	let save_selector = `[data-dragBlock-client-id="${dragBlockClientId}"]`;
	let savedTriggers = {}
	let compiledJS = '';
	let elementSelectorObj = 'dragBlockJS' + dragBlockClientId.replaceAll('-', '');

	// parse triggers
	for (let trigger of dragBlockScripts) {
		if (!trigger['slug']) continue;
		if (!savedTriggers[trigger['slug']]) savedTriggers[trigger['slug']] = '';
		// console.log('trigger', trigger);
		savedTriggers[trigger['slug']] += compileTriggers(trigger, save_selector);
	}

	for (let slug in savedTriggers) {
		if (!savedTriggers[slug]) continue;
		compiledJS += `let ${elementSelectorObj}=document.querySelector('${save_selector}');`;

		compiledJS += `${elementSelectorObj}.addEventListener('${slug}',function(){${savedTriggers[slug]}});`;
	}

	// console.log('compiled', compiledJS);

	// let eventElementStr = 'window["'+eventSourceSelector+'"]'; // use matches
	// 	saveCode += (eventElementStr+'=document.querySelector('+eventSourceSelector+')');
	// 	saveCode += (eventElementStr+'.addEventListener("'+slug+'",'+thenActTargetSelector+');')

	// only update if this create a different code
	if (compiledJS != dragBlockJS) {
		setAttributes({ dragBlockJS: compiledJS })
	}

	// think of using onload image <img onload="javascript:modifyText()" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="display: none"/>
	// write all functions and events


	// if the save js is different, then we need to remove all listeners
	// before adding new ones



	return props;
}


/**
 * https://wordpress.org/support/topic/remove-block-editor-inner-blocks-and-block-editor-block-list__layout/#post-16582721
 * @info Add setting controls to the Inspector Panels or the Toolbar
 */
const dragBlockInteractionsScript = createHigherOrderComponent((BlockEdit) => {
	return (props) => {

		dragBlockInteractionsJS(props);
		return (
			<>
				<BlockEdit {...props} />
				{/* <img onLoad={onload} src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style={...{display: none}}/> */}
			</>
		);
	};
}, 'dragBlockInteractionsScript');

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'dragblock/interactions-script',
	dragBlockInteractionsScript
);
