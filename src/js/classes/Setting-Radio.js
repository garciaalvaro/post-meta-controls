import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { isEmpty, forEach, isString } = lodash;

class Radio extends Setting {
	getPropsDefaultType() {
		return {
			type: "radio",
			default: "",
			meta_type: "string",
			options: []
		};
	}

	getPropsSchemaType() {
		const schema = {
			default: { type: "id" },
			options: { type: "array_object_string" }
		};

		const required_keys = ["label", "options"];
		const private_keys = [];
		const non_empty_values = ["label", "options"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}

	preCleanProps() {
		this.prepareOptions();
	}

	prepareOptions() {
		// TODO: confirm the options are not clean already
		if (isEmpty(this.props.options)) {
			return;
		}

		const options_clean = [];

		forEach(this.props.options, (value, key) => {
			if (!isString(key) || !isString(value)) {
				return;
			}

			options_clean.push({
				value: key,
				label: value
			});
		});

		this.props.options = options_clean;
	}
}

export default Radio;
