import l, { setSchema } from "../utils";
import Setting from "./Setting";

const { forEach, isEmpty, isString, isObject, get, merge } = lodash;

class Select extends Setting {
	getPropsDefaultType() {
		let defaults = {
			type: "select",
			default_value: [],
			multiple: false,
			options: []
		};

		return defaults;
	}

	getPropsSchemaType() {
		const schema = {
			default_value: { type: "array_string" },
			multiple: { type: "boolean" },
			options: { type: "array_object_string" }
		};

		const required_keys = ["label", "options"];
		const private_keys = [];
		const conditions = { label: "not_empty", options: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}

	preCleanProps() {
		this.prepareOptions();
	}

	prepareOptions() {
		if (isEmpty(this.props.options)) {
			return;
		}

		const options_clean = [];

		forEach(this.props.options, (value, key) => {
			// If the option is already prepared
			if (
				isObject(value) &&
				isString(value.value) &&
				isString(value.label)
			) {
				options_clean.push({
					value: value.value,
					label: value.label
				});
			}

			if (!isString(value)) {
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

export default Select;
