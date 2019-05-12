import l, { prepareOptions } from "utils";
import Setting from "../Setting";

class Radio extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.props.options = prepareOptions(this.props.options);
	}

	setDefaults() {
		const this_defaults = {
			type: "radio",
			default_value: "",
			options: []
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "id"
			},
			options: {
				type: { _all: { value: "id", label: "text" } },
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Radio;
