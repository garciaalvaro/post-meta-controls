import l, { store_slug, plugin_slug, prepareValue } from "../../utils";
import settings from "./Settings";

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
} = settings;
const { isUndefined, compact } = lodash;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

class Setting extends Component {
	getClasses = () => {
		const { type, ui_border_top } = this.props;

		let classes;
		classes = [
			`${plugin_slug}-setting`,
			`${plugin_slug}-setting-${type}`,
			!ui_border_top ? `${plugin_slug}-no_border_top` : ""
		];
		classes = compact(classes);
		classes = classes.join(" ");

		return classes;
	};

	render() {
		const { getClasses, props } = this;
		const extended_props = { ...props, classes: getClasses() };

		switch (props.type) {
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

			// Pro:
			case "custom_html":
				if (!isUndefined(CustomHTML)) {
					return <CustomHTML {...extended_props} />;
				}

			default:
				return null;
		}
	}
}

export default compose([
	withSelect((select, { setting_id }) => {
		const { getEditedPostAttribute } = select("core/editor");
		const { getSetting, getPersistedProp } = select(store_slug);
		const setting = getSetting(setting_id);
		const value = prepareValue(
			setting,
			getPersistedProp,
			getEditedPostAttribute
		);

		return {
			...setting,
			value
		};
	}),
	withDispatch((dispatch, props, { select }) => {
		const { id, data_type, data_key_with_prefix } = props;
		const { updateSettingProp, updateMetadataExists } = dispatch(
			store_slug
		);
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

					if (!metadata_exists) {
						updateMetadataExists(data_key_with_prefix);
					}
				} else {
					updateSettingProp(id, "value", value);
				}
			}
		};
	})
])(Setting);
