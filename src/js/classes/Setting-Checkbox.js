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
			default_value: { type: "boolean" }
		};

		const required_keys = ["label"];
		const private_keys = [];
		const conditions = { label: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}
}

export default Checkbox;
