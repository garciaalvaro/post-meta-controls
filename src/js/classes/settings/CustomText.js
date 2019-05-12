import l from "utils";
import Setting from "../Setting";

class CustomText extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "custom_text",
			content: ""
		};

		const parent_defaults = this.getDefaults();

		this.props_defaults = { ...parent_defaults, ...this_defaults };
	}

	setSchema() {
		const this_schema = {
			content: {
				type: {
					_all: {
						type: "id",
						content: { _all: "text" },
						href: "url"
					}
				},
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default CustomText;
