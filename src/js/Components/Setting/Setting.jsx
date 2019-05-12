import l, { Div, store_slug, plugin_slug, prepareValue } from "utils";
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
	// Pro:
	CustomComponent,
	CustomHTML,
	Repeatable
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

	getControl = () => {
		const { props } = this;

		switch (props.type) {
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

			// Pro:
			case "custom_component":
				if (!isUndefined(CustomComponent)) {
					return <CustomComponent {...props} />;
				}

			case "custom_html":
				if (!isUndefined(CustomHTML)) {
					return <CustomHTML {...props} />;
				}

			case "repeatable":
				if (!isUndefined(Repeatable)) {
					return <Repeatable {...props} />;
				}

			default:
				return null;
		}
	};

	render() {
		const { getClasses, getControl, props } = this;
		const { id } = props;
		const control = getControl();

		if (control === null) {
			return null;
		}

		return (
			<Div id={id} className={getClasses()}>
				{control}
			</Div>
		);
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
		const { updateSettingProp, updateMetaKeyExists } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");
		const { getSettingProp } = select(store_slug);
		const use_meta = data_type === "meta";
		const meta_key_exists = getSettingProp(id, "meta_key_exists");

		return {
			updateValue: value => {
				// If the data_type is meta we will save the value to
				// the "core/editor" store. Otherwise we will save it in
				// the plugin store.
				if (use_meta) {
					editPost({
						meta: { [data_key_with_prefix]: value }
					});

					if (!meta_key_exists) {
						updateMetaKeyExists(data_key_with_prefix);
					}
				} else {
					updateSettingProp(id, "value", value);
				}
			}
		};
	})
])(Setting);
