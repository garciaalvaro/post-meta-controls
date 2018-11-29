<?php

namespace POSTSETTINGS;

function create_instance(
	$class_type = '',
	$elements = array(),
	$path = array()
) {

	if ( ! is_array( $elements ) ) {
		return array();
	}

	$props = array();

	foreach ( $elements as $key => $element ) {
		if ( ! is_array( $element ) ) {
			continue;
		}

		$class_instance = false;
		$is_valid       = false;
		$id             = '';
		$children_els   = array();
		$children_type  = '';

		$element['path']  = $path;
		$element['index'] = $key;

		if ( 'sidebar' === $class_type && ! empty( $element['tabs'] ) ) {

			$class_instance = new Sidebar( $element );
			$children_els   = $element['tabs'];
			$children_type  = 'tabs';

		} elseif ( 'tabs' === $class_type && ! empty( $element['panels'] ) ) {

			$class_instance = new Tab( $element );
			$children_els   = $element['panels'];
			$children_type  = 'panels';

		} elseif ( 'panels' === $class_type && ! empty( $element['settings'] ) ) {

			$class_instance = new Panel( $element );
			$children_els   = $element['settings'];
			$children_type  = 'settings';

		} elseif ( 'settings' === $class_type && ! empty( $element['type'] ) ) {

			if ( 'checkbox' === $element['type'] ) {
				$class_instance = new Checkbox( $element );
			} elseif ( 'radio' === $element['type'] ) {
				$class_instance = new Radio( $element );
			} elseif ( 'custom_component' === $element['type'] ) {
				// new CustomComponent( $element );
			}
		}

		if ( $class_instance !== false ) {
			$is_valid = $class_instance->is_valid();
			$id       = $class_instance->get_id();
		}

		if ( true !== $is_valid || empty( $id ) ) {
			return;
		}

		$props_this = $class_instance->get_props();

		if ( 'settings' !== $class_type ) {
			$props_this[ $children_type ] = create_instance(
				$children_type,
				$children_els,
				array_merge( $path, array( $id ) )
			);
		}

		$props = array_merge( $props, array( $props_this ) );
	}

	return $props;
}
