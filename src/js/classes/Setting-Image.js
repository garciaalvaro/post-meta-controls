import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { get, merge } = lodash;

class Image extends Setting {
	getPropsDefaultType() {
		let defaults = {
			type: "select",
			multiple: false,
			default_value: [],
			image_data: []
		};

		return defaults;
	}

	getPropsSchemaType() {
		const schema = {
			multiple: { type: "boolean" },
			default_value: { type: "integer" },
			image_data: { type: "array_object_string" }
		};

		const multiple = get(this.props, "multiple");
		if (multiple) {
			merge(defaults, {
				default_value: { type: "array_integer" }
			});
		}

		const required_keys = ["label"];
		const private_keys = ["image_data"];
		const conditions = { label: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}
}

export default Image;
