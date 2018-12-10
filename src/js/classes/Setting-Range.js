import l, { setSchema } from "../utils";
import Setting from "./Setting";

class Range extends Setting {
	getPropsDefaultType() {
		return {
			type: "range",
			default_value: true,
			min: 0,
			max: 0
		};
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "integer" },
			min: { type: "integer" },
			max: { type: "integer" }
		};

		const required_keys = ["label", "min", "max"];
		const private_keys = [];
		const non_empty_values = ["label", "min", "max"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}
}

export default Range;
