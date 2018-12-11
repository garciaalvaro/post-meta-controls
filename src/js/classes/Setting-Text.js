import l, { setSchema } from "../utils";
import Setting from "./Setting";

class Text extends Setting {
	getPropsDefaultType() {
		return {
			type: "text",
			default_value: ""
		};
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "text" }
		};

		const required_keys = ["label"];
		const private_keys = [];
		const conditions = { label: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}
}

export default Text;
