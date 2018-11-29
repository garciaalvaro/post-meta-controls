import l from "./log";

const { mapValues, includes } = lodash;

const setSchema = (schema, required_keys, private_keys, non_empty_values) => {
	mapValues(schema, (prop_obj, key) => {
		prop_obj.required = includes(required_keys, key);
		prop_obj.private = includes(private_keys, key);
		prop_obj.can_be_empty = !includes(non_empty_values, key);

		return prop_obj;
	});

	return schema;
};

export default setSchema;
