<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function create_instances(
	$class_name = array(),
	$props_raw = array(),
	$path = array(),
	$data_key_prefix_from_sidebar = '',
	$post_type = '',
	$instances = array()
) {

	if ( ! is_array( $props_raw ) ) {
		return array();
	}

	$props = array();

	foreach ( $props_raw as $key => $prop_raw ) {

		if ( ! is_array( $prop_raw ) ) {
			continue;
		}

		$children_props_raw =
			empty( $class_name['children'] ) ||
			empty( $prop_raw[ $class_name['children'] ] )
				? false
				: $prop_raw[ $class_name['children'] ];

		$instance = false;

		$prop_raw['path'] = $path;

		if ( 'sidebars' === $class_name['current'] ) {

			$instance            = new Sidebar( $prop_raw );
			$class_name_children = array(
				'parent'   => 'sidebars',
				'current'  => 'tabs',
				'children' => 'panels',
			);
			$data_key_prefix_from_sidebar = $instance->get_data_key_prefix();
			$post_type                    = $instance->get_post_type();

		} elseif ( 'tabs' === $class_name['current'] ) {

			$prop_raw['post_type'] = $post_type;
			$instance              = new Tab( $prop_raw );
			$class_name_children   = array(
				'parent'   => 'tabs',
				'current'  => 'panels',
				'children' => 'settings',
			);

		} elseif ( 'panels' === $class_name['current'] ) {

			$prop_raw['post_type'] = $post_type;
			$instance              = new Panel( $prop_raw );
			$class_name_children   = array(
				'parent'   => 'panels',
				'current'  => 'settings',
				'children' => '',
			);

		} elseif ( 'settings' === $class_name['current'] && ! empty( $prop_raw['type'] ) ) {

			$class_name_children = array(
				'parent'   => 'settings',
				'current'  => '',
				'children' => '',
			);

			$prop_raw['data_key_prefix_from_sidebar'] =
				$data_key_prefix_from_sidebar;

			$prop_raw['post_type'] = $post_type;

			switch ( $prop_raw['type'] ) {
				case 'buttons':
					$instance = new Buttons( $prop_raw );
					break;

				case 'checkbox':
					$instance = new Checkbox( $prop_raw );
					break;

				case 'checkbox_multiple':
					$instance = new CheckboxMultiple( $prop_raw );
					break;

				case 'color':
					$instance = new Color( $prop_raw );
					break;

				case 'custom_text':
					$instance = new CustomText( $prop_raw );
					break;

				case 'date_range':
					$instance = new DateRange( $prop_raw );
					break;

				case 'image':
					$instance = new Image( $prop_raw );
					break;

				case 'image_multiple':
					$instance = new ImageMultiple( $prop_raw );
					break;

				case 'radio':
					$instance = new Radio( $prop_raw );
					break;

				case 'range':
					$instance = new Range( $prop_raw );
					break;

				case 'range_float':
					$instance = new RangeFloat( $prop_raw );
					break;

				case 'select':
					$instance = new Select( $prop_raw );
					break;

				case 'text':
					$instance = new Text( $prop_raw );
					break;

				case 'textarea':
					$instance = new Textarea( $prop_raw );
					break;

				// TODO: add this to a filter somehow in the pro folder?
				case 'custom_html':
					if ( class_exists( __NAMESPACE__ . '\CustomHTML' ) ) {
						$instance = new CustomHTML( $prop_raw );
					}
					break;

				default:
					break;
			}
		}

		if ( false !== $instance ) {

			$instances[ $class_name['current'] ] =
				! isset( $instances[ $class_name['current'] ] )
					? array()
					: $instances[ $class_name['current'] ];

			$instances[ $class_name['current'] ][] = $instance;

		}

		if ( ! empty( $children_props_raw ) ) {

			$children_path = wp_parse_args( array( $instance->get_id() ), $path );

			$instances = create_instances(
				$class_name_children,
				$children_props_raw,
				$children_path,
				$data_key_prefix_from_sidebar,
				$post_type,
				$instances
			);
		}
	}

	return $instances;
}
