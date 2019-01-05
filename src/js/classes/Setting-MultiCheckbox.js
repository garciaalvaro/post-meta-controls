import l from "../utils";
import Setting from "./Setting";

const { forEach, isEmpty, isString, isObject } = lodash;

class MultiCheckbox extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.prepareOptions();
	}

	prepareOptions() {
		if (isEmpty(this.props.options)) {
			return;
		}

		const options_clean = [];

		forEach(this.props.options, (value, key) => {
			// If the option is already prepared
			if (
				isObject(value) &&
				isString(value.value) &&
				isString(value.label)
			) {
				options_clean.push({
					value: value.value,
					label: value.label
				});
				return;
			}

			if (!isString(value)) {
				return;
			}

			options_clean.push({
				value: key,
				label: value
			});
		});

		this.props.options = options_clean;
	}

	setDefaults() {
		const this_defaults = {
			type: "multi_checkbox",
			default_value: "",
			options: [],
			use_toggle: false
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "array_id"
			},
			options: {
				type: "array_object_text",
				conditions: "not_empty"
			},
			use_toggle: {
				type: "boolean"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default MultiCheckbox;
