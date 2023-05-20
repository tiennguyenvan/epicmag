<?php


define('DRAG_BLOCK_GOOGLE_FONTS', array(
	'Abril Fatface', 
	'Alfa Slab One',
	'Amaranth',
	'Amatic SC',
	'Baloo',
	'Corben',
	'Crimson Pro',
	'Dancing Script',	
	'Elsie',
	'Fauna One',
	'Josefin Sans',
	'Josefin Slab',
	'Lato',
	'Manrope',
	'Merriweather',
	'Montserrat',
	'Nobile',
	'Open Sans',
	'Oswald',
	'Palanquin',
	'Poppins',	
	'Quattrocento',
	'Raleway',
	'Roboto',
	'Sansita',
	'Sora',
	'Six Caps',
	'Space Grotesk',
	'Spirax',
	'Source Sans Pro',
	'Wendy One',
));

define('DRAG_BLOCK_DEFAULT_FONTS', array(
    'Arial, Helvetica, sans-serif',
    'Times New Roman, Times, serif',
    'Courier New, Courier, monospace',
    'Verdana, Geneva, sans-serif',
    'Georgia, serif',
    'Trebuchet MS, Helvetica, sans-serif',
    'Helvetica, Arial, sans-serif',
    'Comic Sans MS, cursive'
));

if ( ! class_exists( 'Drag_Block_Fonts_Google_Provider' ) && class_exists('WP_Webfonts_Provider')) :
/**
 * Google Font Provider
 */
class Drag_Block_Fonts_Google_Provider extends WP_Webfonts_Provider {
	protected $id = 'dragblock-fonts-google-provider';
	

	public function get_css() {
		$css = '';
		foreach ($this->webfonts as $font) {
			$font_family = str_replace(' ', '+', $font['font-family']);
			$css .= "@import url('https://fonts.googleapis.com/css2?family=$font_family:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');" ;
		}
		return $css;
	}
}

/**
 * Default Font Provider
 */
class Drag_Block_Fonts_Default_Provider extends WP_Webfonts_Provider {
	protected $id = 'dragblock-fonts-default-provider';
	

	public function get_css() {
		return '';
	}
}


/**
 * register Google Fonts to system
 */
add_action( 'after_setup_theme', function() {
	if ( ! function_exists( 'wp_register_webfonts' ) ) {
		return;
	}

	wp_register_webfont_provider('dragblock-fonts-default-provider', 'Drag_Block_Fonts_Default_Provider');
	wp_register_webfont_provider('dragblock-fonts-google-provider', 'Drag_Block_Fonts_Google_Provider');
	

	$register_fonts = array();

	foreach (DRAG_BLOCK_DEFAULT_FONTS as $font) {
		$register_fonts[] = array(
			'font-family' => $font,
			'src' => '',
			'provider' => 'dragblock-fonts-default-provider'
		);
	}	
	foreach (DRAG_BLOCK_GOOGLE_FONTS as $font) {
		$register_fonts[] = array(
			'font-family' => $font,
			'src' => $font,
			'provider' => 'dragblock-fonts-google-provider'
		);
	}	
	

	wp_register_webfonts($register_fonts);
} );


/**
 * Automatically detect and enqueue selected fonts for the front-end
 */
function drag_block_font_family_enqueue($setting) {
	if (!is_array($setting)) return;

	// enqueue this fontFamily which was selected if it is registered
	if (!empty($setting['fontFamily'])) {
		// the fonts that has space in their name
		$font_family = str_replace(array('\'', '"'), '', $setting['fontFamily']);

		// process the font-family settings for the site texts
		if (strpos($font_family, 'font-family|')) {
			$font_family = explode('font-family|', $font_family)[1];
			$font_family = str_replace('-', ' ', $font_family);
		}

		// if this font is found in the Goolge Font List
		$font_family = strtolower($font_family);
		foreach (DRAG_BLOCK_GOOGLE_FONTS as $font) {
			$font_lower = strtolower($font);
			if ($font_lower == $font_family) {
				wp_enqueue_webfont($font);
				break;
			}
		}
	}

	// traverse deeper to find other fontFamily settings
	foreach ($setting as $sub_settings) {
		drag_block_font_family_enqueue($sub_settings);
	}

}
add_action( 'wp_enqueue_scripts', function() {	
	if ( ! function_exists( 'wp_register_webfonts' ) ) {
		return;
	}

	drag_block_font_family_enqueue(wp_get_global_styles());
} );


/**
 * Preload Google Font for faster loading speed
 */
function drag_block_fonts_preload($urls, $relation_type) {
	if ('preconnect' === $relation_type) {
		$urls[] = array('href' => 'https://fonts.gstatic.com','crossorigin');
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'drag_block_fonts_preload', 10, 2 );



/**
 * Enqueue all Google Fonts to Enhance Font Selectors of Editor
 */
/**
 * all scripts and styles for modifying editor UI, ex: settings, controls, toolbars ... but the blocks
 */
function drag_block_enqueue_editor_fonts() {
    foreach (DRAG_BLOCK_GOOGLE_FONTS as $font) {
		wp_enqueue_webfont($font);
	}
}
add_action( 'enqueue_block_editor_assets', 'drag_block_enqueue_editor_fonts' );
endif;
