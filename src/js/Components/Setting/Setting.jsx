import l, { store_slug, plugin_slug } from "../../utils";
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
		const extended_props = { ...props, classes: this.getClasses() };

		switch (type) {
			case "buttons":
				return <Buttons {...extended_props} />;

			case "checkbox":
				return <Checkbox {...extended_props} />;

			case "checkbox_multiple":
				return <CheckboxMultiple {...extended_props} />;

			case "color":
				return <Color {...extended_props} />;

			case "custom_text":
				return <CustomText {...extended_props} />;

			case "date_range":
				return <DateRange {...extended_props} />;

			case "date_single":
				return <DateSingle {...extended_props} />;

			case "image":
				return <Image {...extended_props} />;

			case "image_multiple":
				return <ImageMultiple {...extended_props} />;

			case "radio":
				return <Radio {...extended_props} />;

			case "range":
				return <Range {...extended_props} />;

			case "range_float":
				return <RangeFloat {...extended_props} />;

			case "select":
				return <Select {...extended_props} />;

			case "text":
				return <Text {...extended_props} />;

			case "textarea":
				return <Textarea {...extended_props} />;

			case "custom_html":
				if (!isUndefined(CustomHTML)) {
					return <CustomHTML {...extended_props} />;
				}

			default:
				return null;
		}
	}

	getClasses = () => {
		let classes;
		classes = [
			`${plugin_slug}-control`,
			`${plugin_slug}-control-${this.props.type}`
		];
		classes = classes.join(" ");

		return classes;
	};

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
