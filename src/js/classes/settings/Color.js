import l from "utils";
import Setting from "../Setting";

class Color extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.preparePalette();
	}

	setDefaults() {
		const this_defaults = {
			type: "color",
			default_value: "",
			alpha_control: false,
			palette: []
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: { type: "id" },
			alpha_control: { type: "boolean" },
			palette: { type: { _all: { name: "id", color: "text" } } }
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Color;
