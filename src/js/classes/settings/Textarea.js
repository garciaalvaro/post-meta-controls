import l from "utils";
import Setting from "../Setting";

class Textarea extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "textarea",
			default_value: "",
			placeholder: ""
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			default_value: {
				type: "text"
			},
			placeholder: {
				type: "text"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Textarea;
