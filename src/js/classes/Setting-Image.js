import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { get, merge } = lodash;

class Image extends Setting {
	getPropsDefaultType() {
		let defaults = {
			type: "select",
			default_value: 0,
			multiple: false,
			image_data: {}
		};

		const multiple = get(this.props, "multiple");
		if (multiple) {
			merge(defaults, {
				default_value: [],
				image_data: []
			});
		}

		return defaults;
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "integer" },
			multiple: { type: "boolean" },
			image_data: { type: "integer" }
		};

		const required_keys = ["label"];
		const private_keys = ["image_data"];
		const conditions = { label: "not_empty" };

		const multiple = get(this.props, "multiple");
		if (multiple) {
			merge(schema, {
				default_value: { type: "array_integer" },
				image_data: { type: "array_object_string" }
			});
		}

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}
}

export default Image;
