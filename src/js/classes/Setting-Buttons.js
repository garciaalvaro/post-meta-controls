import l, { sanitize } from "../utils";
import Setting from "./Setting";

const { forEach, isEmpty, isUndefined, isObject } = lodash;

class Buttons extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.prepareOptions();
	}

	prepareOptions() {
		if (isEmpty(this.props.options)) {
			return;
		}

		const options_clean = [];

		forEach(this.props.options, button_obj => {
			if (!isObject(button_obj)) {
				return;
			}

			const button_clean = {};
			const icon_svg = sanitize.html(button_obj.icon_svg);
			const icon_dashicon = sanitize.id(button_obj.icon_dashicon);
			const title = sanitize.text(button_obj.title);
			const value = sanitize.text(button_obj.value);

			if (icon_svg !== "") {
				button_clean.icon_svg = icon_svg;
			} else if (icon_dashicon !== "") {
				button_clean.icon_dashicon = icon_dashicon;
			}

			if (title !== "") {
				button_clean.title = title;
			}

			if (value !== "") {
				button_clean.value = value;
			}

			if (
				!isUndefined(button_clean.value) &&
				(!isUndefined(button_clean.icon_dashicon) ||
					!isUndefined(button_clean.icon_svg))
			) {
				options_clean.push(button_clean);
			}
		});

		this.props.options = options_clean;
	}

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
				type: "array_object_string",
				conditions: "not_empty"
			}
		};

		const parent_schema = this.getSchema();

		this.props_schema = { ...parent_schema, ...this_schema };
	}
}

export default Buttons;
