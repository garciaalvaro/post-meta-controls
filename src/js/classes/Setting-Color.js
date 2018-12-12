import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { forEach, isEmpty, isString, isObject } = lodash;

class Color extends Setting {
	getPropsDefaultType() {
		return {
			type: "color",
			default_value: "",
			alpha: false,
			palette: []
		};
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "id" },
			alpha: { type: "bool" },
			palette: { type: "array_object_string" }
		};

		const required_keys = ["label", "palette"];
		const private_keys = [];
		const conditions = { label: "not_empty", palette: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}

	preCleanProps() {
		this.preparePalette();
	}

	preparePalette() {
		if (isEmpty(this.props.palette)) {
			return;
		}

		const palette_clean = [];

		forEach(this.props.palette, (value, key) => {
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
}

export default Color;
