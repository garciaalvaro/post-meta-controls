import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { Component } from "@wordpress/element";
import { isUndefined } from "lodash";

import { store_slug } from "utils/data";

interface WithSelectProps {
	value: any;
}

interface WithDispatchProps {
	updateValue: (value: any) => void;
}

interface OwnProps extends SettingPropsShared {
	default_value: any;
}

interface Props extends OwnProps, WithSelectProps, WithDispatchProps {}

export const withMetaData = compose(
	withDispatch<WithDispatchProps, OwnProps>(
		(dispatch, { meta_key_exists, data_key_with_prefix }) => ({
			updateValue: (value: any) => {
				// Save the value to the "core/editor" store.
				dispatch("core/editor").editPost({
					meta: { [data_key_with_prefix]: value }
				});

				if (!meta_key_exists) {
					dispatch(store_slug).setMetaKeyExists(data_key_with_prefix);
				}
			}
		})
	),

	withSelect<WithSelectProps, OwnProps>(
		(select, { data_key_with_prefix, default_value, meta_key_exists }) => {
			const meta: Obj | undefined = select(
				"core/editor"
			).getEditedPostAttribute("meta");

			return {
				value:
					meta && meta_key_exists ? meta[data_key_with_prefix] : default_value
			};
		}
	),

	(WrappedComponent: React.ComponentType<OwnProps>) =>
		class extends Component<Props> {
			// When publishing the post getEditedPostAttribute/getCurrentPostAttribute
			// return an object only with the keys that changed. The value
			// passed for any key which didnt change is undefined. We check it and
			// prevent the component from rendering.
			shouldComponentUpdate(next_props: Props) {
				if (isUndefined(next_props.value)) {
					return false;
				}

				return true;
			}

			render() {
				return <WrappedComponent {...this.props} />;
			}
		}
);
