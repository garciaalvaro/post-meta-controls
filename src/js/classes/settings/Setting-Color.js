import l, { sanitize } from "../../utils";
import Setting from "../Setting";

const { forEach, isEmpty, isString, isObject } = lodash;

class Color extends Setting {
	beforeSetSchema() {
		super.beforeSetSchema();
		this.preparePalette();
	}

	preparePalette() {
		const palette = sanitize.array(this.props.palette);
		const palette_clean = [];

		forEach(palette, (value, key) => {
			// If the option is already prepared
			if (
				isObject(value) &&
				isString(value.name) &&
				isString(value.color)
			) {
				palette_clean.push({
					name: value.name,
					color: value.color
				});

				return;
			}

			if (!isString(value)) {
				return;
			}

			palette_clean.push({
				name: key,
				color: value
			});
		});

		this.props.palette = palette_clean;
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
