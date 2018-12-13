import l, { store_slug } from "../../utils";
import { setTimeout } from "timers";

const { isEmpty, toString } = lodash;
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
		const should_save_meta =
			valid && data_type === "meta" && !isEmpty(data_key_with_prefix);
		const updateValue = value => {
			updateSettingValue(id, value);

			if (should_save_meta) {
				if (type === "range" && props.float_number) {
					value = toString(value);
				}

				l(data_key_with_prefix, value);
				editPost({
					meta: { [data_key_with_prefix]: value }
				});
			}
		};

		return {
			updateValue,
			toggleValue: () => {
				let value = value_old === false;
				updateSettingValue(id, value);

				if (should_save_meta) {
					value = value === false ? 0 : true;
					editPost({
						meta: { [data_key_with_prefix]: value }
					});
				}
			}
		};
	}),
	withStoreConnection
]);
