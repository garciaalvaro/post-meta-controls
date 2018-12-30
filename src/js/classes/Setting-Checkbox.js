import l from "../utils";
import Setting from "./Setting";

class Checkbox extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "checkbox",
			default_value: false,
			label: "",
			use_toggle: false
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "boolean"
			},
			label: {
				type: "text",
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

export default Checkbox;
