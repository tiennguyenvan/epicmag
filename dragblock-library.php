<?php

// Start the session
add_action( 'init', 'drag_block_block_start_session', 1 );
function drag_block_block_start_session() {
    if ( ! session_id() ) {
        session_start();
    }
}

function drag_block_array_merge($receiver, $provider)
{
	foreach ($provider as $key => $value) {
		if (!isset($receiver[$key])) {
			
			$receiver[$key] = $value;
			continue;
		}		
		if (
			// linear values
			!is_array($value) ||
			// OR empty arrays
			empty($value) ||
			// OR linear arrays
			key($value) === 0
		) {
			// then we don't have to check further 
			// because the user defined the value he wanted
			continue;
		}

		// this is a non-linear, non-empty array
		$receiver[$key] = drag_block_array_merge($receiver[$key], $value);
	}

	return $receiver;
}


/**
 * 
 */
function drag_block_url($path)
{
    return plugins_url($path, __FILE__);
}
