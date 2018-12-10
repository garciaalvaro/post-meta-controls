import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { get, merge } = lodash;

class Range extends Setting {
	getPropsDefaultType() {
		return {
			type: "range",
			default_value: true,
			step: 1,
			min: 0,
			max: 0,
			float_number: false
		};
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "integer" },
			step: { type: "integer" },
			min: { type: "integer" },
			max: { type: "integer" },
			float_number: { type: "bool" }
		};

		const float_number = get(this.props, "float_number");
		if (float_number === true) {
			merge(schema, {
				step: { type: "float" },
				min: { type: "float" },
				max: { type: "float" }
			});
		}

		const required_keys = ["label", "min", "max"];
		const private_keys = [];
		const conditions = {
			label: "not_empty",
			step: [
				{
					argument_1: "step",
					operator: "greater_than",
					argument_2: 0,
					argument_2_is_prop: false
				}
			],
			min: [
				{
					argument_1: "max",
					operator: "greater_than",
					argument_2: "min",
					argument_2_is_prop: true
				}
			],
			max: [
				// {
				// 	argument_1: "max",
				// 	operator: "greater_than",
				// 	argument_2: "min",
				// 	argument_2_is_prop: true
				// },
				{
					argument_1: "max",
					operator: "greater_than",
					argument_2: 0,
					argument_2_is_prop: false
				}
			]
		};

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}
}

export default Range;
