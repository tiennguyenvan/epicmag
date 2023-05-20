import { times } from 'lodash';
import './style.scss';
import './editor.scss';



////////////////////////////////
// DRAG_BLOCK FORM PROCESSING
////////////////////////////////
var dragBlockFormElFocused = 0;
var dragBlockFormElInputted = 0;

document.addEventListener('DOMContentLoaded', function () {
    // update if the content is changed and 
    let inputs = document.querySelectorAll('input,select,textarea');
    inputs.forEach(function (el) {
        el.addEventListener('input', function(){            
            dragBlockFormElInputted = Date.now();            
        });
        el.addEventListener('focus', function(){
            if (dragBlockFormElFocused) return;
            dragBlockFormElFocused = Date.now();            
        });
    });

    // get the submit button elements
    let submitButtons = document.querySelectorAll('input[type="submit"], input[type="button"], button');
    
    if (!submitButtons) {
        return;
    }
    // add event listener for click event to each button
    submitButtons.forEach(function (submitButton) {
        submitButton.addEventListener('mousedown', function () {
            // check if this is our form
            let requireField = document.querySelectorAll('input[name="dragblock/form-title"]');

            if (!requireField || requireField.length == 0) {
                
                return false;
            }
            
            
            // we don't allow to submit any thing if the behavior is suspected
            // - did not focus any field
            // - did not change any field
            // - time between focus and change is too short (< 500 ms)
            if (!dragBlockFormElFocused || 
                !dragBlockFormElInputted ||
                500 > (dragBlockFormElInputted - dragBlockFormElFocused)
            ) {
                
                return false;
            }

            // insert a nonce field to prevent multiple submissions
            var nonceInput = document.createElement('input');
            nonceInput.setAttribute('type', 'hidden');
            nonceInput.setAttribute('name', 'dragblock/form-nonce-field');
            nonceInput.setAttribute('value', DRAG_BLOCK_FORM_NONCE_ACTION);
            // insert the new element before the button
            submitButton.parentNode.insertBefore(nonceInput, submitButton);

          
            // insert a js token field to prevent multiple submissions
            var tokenInput = document.createElement('input');
            tokenInput.setAttribute('type', 'hidden');
            tokenInput.setAttribute('name', 'dragblock/form-session-token');
            tokenInput.setAttribute('value', DRAG_BLOCK_FORM_SESSION_TOKEN);
            // insert the new element before the button
            submitButton.parentNode.insertBefore(tokenInput, submitButton);
        });
    });
});
