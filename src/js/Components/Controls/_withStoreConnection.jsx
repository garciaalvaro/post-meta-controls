import l, { store_slug } from "../../utils";

const { isEmpty, isArray, toString, get } = lodash;
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
	withDispatch((dispatch, props) => {
		const {
			id,
			valid,
			type,
			data_type,
			data_key_with_prefix,
			value: value_old
		} = props;
		const { updateSettingValue } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");
		const save_meta =
			valid && data_type === "meta" && !isEmpty(data_key_with_prefix);
		const updateValue = value => {
			updateSettingValue(id, value);

			if (save_meta) {
				const multiple = get(props, "multiple");
				if (type === "range" && props.float_number) {
					value = toString(value);
				} else if (multiple === false && isArray(multiple)) {
					value = value[0];
				} else if (type === "checkbox") {
					value = value === false ? 0 : true;
				}

				editPost({
					meta: { [data_key_with_prefix]: value }
				});
			}
		};

		return {
			updateValue,
			toggleValue: () => {
				const value = value_old === false;
				updateValue(value);
			}
		};
	}),
	withStoreConnection
]);
