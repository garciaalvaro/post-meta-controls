<?php

namespace POSTSETTINGS;

function create_instances(
	$class_name = array(),
	$props_raw = array(),
	$path = array(),
	$data_key_prefix_from_sidebar = '',
	$post_type = '',
	$class_instances = array()
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
			empty( $class_name['children'] ) || empty( $prop_raw[ $class_name['children'] ] )
				? array()
				: $prop_raw[ $class_name['children'] ];

		$class_instance = false;

		$prop_raw['path'] = $path;

		if ( 'sidebars' === $class_name['current'] ) {

			$class_instance      = new Sidebar( $prop_raw );
			$class_name_children = array(
				'parent'   => 'sidebars',
				'current'  => 'tabs',
				'children' => 'panels',
			);
			$data_key_prefix_from_sidebar = $class_instance->get_data_key_prefix();
			$post_type                    = $class_instance->get_post_type();

		} elseif ( 'tabs' === $class_name['current'] ) {

			$class_instance      = new Tab( $prop_raw );
			$class_name_children = array(
				'parent'   => 'tabs',
				'current'  => 'panels',
				'children' => 'settings',
			);

		} elseif ( 'panels' === $class_name['current'] ) {

			$class_instance      = new Panel( $prop_raw );
			$class_name_children = array(
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
				case 'checkbox':
					$class_instance = new Checkbox( $prop_raw );
					break;

				case 'radio':
					$class_instance = new Radio( $prop_raw );
					break;

				case 'select':
					$class_instance = new Select( $prop_raw );
					break;

				case 'range':
					$class_instance = new Range( $prop_raw );
					break;

				case 'text':
					$class_instance = new Text( $prop_raw );
					break;

				case 'textarea':
					$class_instance = new Textarea( $prop_raw );
					break;

				case 'color':
					$class_instance = new Color( $prop_raw );
					break;

				case 'image':
					$class_instance = new Image( $prop_raw );
					break;

				case 'custom_html':
					$class_instance = new CustomHTML( $prop_raw );
					break;

				case 'custom_text':
					$class_instance = new CustomText( $prop_raw );
					break;

				default:
					break;
			}
		}

		if (
			false !== $class_instance// &&
			// ( true === $class_instance->is_valid() ||
			//   'settings' === $class_name['current'] )
		) {

			$class_instances[ $class_name['current'] ] =
				! isset( $class_instances[ $class_name['current'] ] )
					? array()
					: $class_instances[ $class_name['current'] ];

			$class_instances[ $class_name['current'] ][] = $class_instance;

		}

		if ( ! empty( $children_props_raw ) ) {

			$children_path = \wp_parse_args( array( $class_instance->get_id() ), $path );

			$class_instances = create_instances(
				$class_name_children,
				$children_props_raw,
				$children_path,
				$data_key_prefix_from_sidebar,
				$post_type,
				$class_instances
			);
		}
	}

	return $class_instances;
}
