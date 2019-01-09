import l, { prepareOptions } from "../../utils";
import Setting from "../Setting";

class Select extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.props.options = prepareOptions(this.props.options);
	}

	setDefaults() {
		const this_defaults = {
			type: "select",
			default_value: "", // It will be passed through castArray().
			multiple: false,
			options: []
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: this.props.multiple ? { _all: "id" } : "id"
			},
			multiple: {
				type: "boolean"
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

export default Select;
