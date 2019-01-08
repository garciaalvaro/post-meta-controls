import l, { prepareOptions } from "../utils";
import Setting from "./Setting";

class MultiCheckbox extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.props.options = prepareOptions(this.props.options);
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
