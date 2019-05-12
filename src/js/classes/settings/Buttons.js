import l from "utils";
import Setting from "../Setting";

class Buttons extends Setting {
	setDefaults() {
		const this_defaults = {
			type: "buttons",
			default_value: "",
			allow_empty: false,
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
			allow_empty: {
				type: "boolean"
			},
			options: {
				type: {
					_all: {
						value: "id",
						title: "text",
						icon_dashicon: "id",
						icon_svg: "html"
					}
				},
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Buttons;
