import l, { setSchema } from "../utils";
import Setting from "./Setting";

class Checkbox extends Setting {
	getPropsDefaultType() {
		return {
			type: "checkbox",
			default_value: true
		};
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "bool" }
		};

		const required_keys = ["label"];
		const private_keys = [];
		const non_empty_values = ["label"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}
}

export default Checkbox;