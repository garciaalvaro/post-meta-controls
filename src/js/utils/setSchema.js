import l from "./log";

const { mapValues, includes, isUndefined } = lodash;

const setSchema = (schema, required_keys, private_keys, conditions) => {
	mapValues(schema, (prop_obj, key) => {
		prop_obj.required = includes(required_keys, key);
		prop_obj.private = includes(private_keys, key);

		if (!isUndefined(conditions[key])) {
			prop_obj.conditions = conditions[key];
		}

		return prop_obj;
	});

	return schema;
};

export default setSchema;
