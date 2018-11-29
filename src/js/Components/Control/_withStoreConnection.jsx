import l, { store_slug } from "../../utils";

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;

const withStoreConnection = WrappedComponent => {
	return class extends Component {
		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};

export default compose([
	withSelect((select, { id }) => {
		const { getEditedPostAttribute } = select("core/editor");

		return {
			meta: getEditedPostAttribute("meta")
		};
	}),
	withDispatch((dispatch, { id, meta_key, value, meta }) => {
		const { updateSettingValue } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");

		return {
			update: value_new => {
				updateSettingValue(id, value_new);
				editPost({ meta: { [meta_key]: value_new } });
				// editPost({ meta: { ...meta, [id]: value_new } });
				l({ meta: { ...meta, [meta_key]: value_new } });
			},
			toggle: () => {
				updateSettingValue(id, !value);
				editPost({ meta: { [meta_key]: !value } });
				// editPost({ meta: { ...meta, [meta_key]: !value } });
			}
		};
	}),
	withStoreConnection
]);
