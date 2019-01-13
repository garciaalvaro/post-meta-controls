import l, { store_slug } from "../../utils";
import controls from "../Controls";

const {
	Buttons,
	Checkbox,
	CheckboxMultiple,
	Color,
	CustomText,
	DateRange,
	DateSingle,
	Image,
	ImageMultiple,
	Radio,
	Range,
	RangeFloat,
	Select,
	Text,
	Textarea,
	// TODO: Pro
	CustomHTML
} = controls;
const { isUndefined } = lodash;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

class Setting extends Component {
	getControl() {
		const { props } = this;
		const { type } = props;

		switch (type) {
			case "buttons":
				return <Buttons {...props} />;

			case "checkbox":
				return <Checkbox {...props} />;

			case "checkbox_multiple":
				return <CheckboxMultiple {...props} />;

			case "color":
				return <Color {...props} />;

			case "custom_text":
				return <CustomText {...props} />;

			case "date_range":
				return <DateRange {...props} />;

			case "date_single":
				return <DateSingle {...props} />;

			case "image":
				return <Image {...props} />;

			case "image_multiple":
				return <ImageMultiple {...props} />;

			case "radio":
				return <Radio {...props} />;

			case "range":
				return <Range {...props} />;

			case "range_float":
				return <RangeFloat {...props} />;

			case "select":
				return <Select {...props} />;

			case "text":
				return <Text {...props} />;

			case "textarea":
				return <Textarea {...props} />;

			case "custom_html":
				if (!isUndefined(CustomHTML)) {
					return <CustomHTML {...props} />;
				}

			default:
				return null;
		}
	}

	render() {
		// const { id } = this.props;

		return this.getControl();

		// return (
		// 	<Div
		// 		id={`${plugin_slug}-control-${id}`}
		// 		className={`${plugin_slug}-control`}
		// 	>
		// 		{this.getControl()}
		// 	</Div>
		// );
	}
}

export default compose([
	withSelect((select, { id }) => {
		const { getEditedPostAttribute } = select("core/editor");
		const { getSetting, getPersistedProp } = select(store_slug);
		const setting = getSetting(id);
		let {
			data_type,
			value,
			default_value,
			data_key_with_prefix,
			metadata_exists
		} = setting;
		const use_meta = data_type === "meta";
		const use_local = data_type === "localstorage";

		// If the data_type is meta we will get the value from
		// the "core/editor" store.
		value =
			use_meta && metadata_exists
				? getEditedPostAttribute("meta")[data_key_with_prefix]
				: value;
		// If the data_type is localstorage we will get the value from
		// the settings_persisted prop of the plugin store.
		value =
			use_local && isUndefined(value)
				? getPersistedProp(data_key_with_prefix)
				: value;
		// If there is no value yet set the default.
		value = isUndefined(value) ? default_value : value;

		return {
			...setting,
			value
		};
	}),
	withDispatch((dispatch, props, { select }) => {
		const { id, data_type, data_key_with_prefix } = props;
		const { updateSettingProp } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");
		const { getSettingProp } = select(store_slug);
		const use_meta = data_type === "meta";
		const metadata_exists = getSettingProp(id, "metadata_exists");

		return {
			updateValue: value => {
				// If the data_type is meta we will save the value to
				// the "core/editor" store. Otherwise we will save it in
				// the plugin store.
				if (use_meta) {
					editPost({
						meta: { [data_key_with_prefix]: value }
					});
					l("updateValue", value);
					if (!metadata_exists) {
						updateSettingProp(id, "metadata_exists", true);
					}
				} else {
					updateSettingProp(id, "value", value);
				}
			}
		};
	})
])(Setting);
