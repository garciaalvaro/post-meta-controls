import l from "../utils";
import Setting from "./Setting";

class CustomHTML extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "custom_html",
			html_string: ""
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			html_string: {
				type: "html",
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default CustomHTML;
