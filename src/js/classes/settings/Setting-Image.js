import l from "../../utils";
import Setting from "../Setting";

class Image extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "select",
			default_value: 0, // It will be passed through castArray().
			multiple: false
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: this.props.multiple ? { _all: "integer" } : "integer"
			},
			multiple: {
				type: "boolean"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Image;
