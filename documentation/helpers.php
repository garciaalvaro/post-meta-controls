<?php

	// Setting - Buttons. Returns a string with the selected option;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_buttons( $meta_key, $post_id, $default_value );

	// Setting - Checkbox. Returns true or false;
	// or the $default_value passed (an empty string '') if the meta key doesn't exist.
	pmc_get_checkbox( $meta_key, $post_id, $default_value );

	// Setting - Checkbox Multiple. Returns an array of strings with the selected options;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_checkbox_multiple( $meta_key, $post_id, $default_value );

	// Setting - Color. Returns a color string or an array:
	// array( 'color' => 'rgb(0,0,0)', 'alpha' => 50 );
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_color( $meta_key, $post_id, $default_value, $return_string );

	// Setting - Date Range. Returns an array of two strings: start date and end date;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_date_range( $meta_key, $post_id, $default_value );

	// Setting - Date Single. Returns a string;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_date_single( $meta_key, $post_id, $default_value );

	// Setting - Image. Returns an integer which is the image id or an array with the image properties:
	// array( 'url' => '#', 'width' => 123, 'height' => 456 );
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_image( $meta_key, $post_id, $default_value, $size, $return_array );

	// Setting - Image Multiple. Returns an array of integers which are the images id
	// or an array of arrays with the images properties:
	// array( '123' => array( 'url' => '#', 'width' => 123, 'height' => 456 ) );
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_image_multiple( $meta_key, $post_id, $default_value, $size, $return_array );

	// Setting - Radio. Returns a string with the selected option;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_radio( $meta_key, $post_id, $default_value );

	// Setting - Range. Returns an integer; or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_range( $meta_key, $post_id, $default_value );

	// Setting - Range Float. Returns a float; or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_range_float( $meta_key, $post_id, $default_value );

	// Setting - Select. Returns a string with the selected option;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_select( $meta_key, $post_id, $default_value );

	// Setting - Text. Returns a string;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_text( $meta_key, $post_id, $default_value );

	// Setting - Text. Returns a string;
	// or the $default_value passed (false) if the meta key doesn't exist.
	pmc_get_textarea( $meta_key, $post_id, $default_value );


**$meta_key** *(string)* Required. Name of the key the setting was registered with. Remember to include the prefix: *myprefix_mymetakey*
**$post_id** *(integer)* Post id to get the value from. If an empty string *''* is passed **get_the_ID()** will be used.
**$default_value** *(string|integer|float|boolean|array)* Custom value to return in case the meta key doesn't exist yet.
**$size** *(string)* Used in the image settings to return this image sizes. Any registered size, default ones are *thumbnail*, *medium*, *large*, *full*.
**$return_array** *(boolean)* Used in the image settings. Pass false to return the image id/s instead of its properties.
**$return_string** *(boolean)* Used in the color setting to return a color string or an array of color and alpha.
