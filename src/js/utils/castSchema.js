import l from "./log";
import sanitize from "./sanitize";

const { isUndefined, isObject, isArray, castArray, forEach, get } = lodash;

const castSchema = (elements, schema) => {
	forEach(elements, (value, key) => {
		let schema_type;

		if (!isUndefined(get(schema[key], "type"))) {
			schema_type = schema[key].type;
		} else if (!isUndefined(schema[key])) {
			schema_type = schema[key];
		} else if (!isUndefined(schema._all)) {
			schema_type = schema._all;
		} else {
			delete elements[key];
			return;
		}

		if (isObject(schema_type)) {
			value =
				!isObject(value) && !isArray(value) ? castArray(value) : value;

			elements[key] = castSchema(value, schema_type);
			return;
		}

		switch (schema_type) {
			case "html":
				if (value === "") {
					elements[key] = "";
					break;
				}

				value = JSON.parse(value);
				elements[key] = sanitize.html(value);
				break;

			case "id":
				elements[key] = sanitize.id(value);
				break;

			case "url":
				elements[key] = sanitize.url(value);
				break;

			case "text":
				elements[key] = sanitize.text(value);
				break;

			case "integer":
				elements[key] = sanitize.integer(value);
				break;

			case "float":
				elements[key] = sanitize.float(value);
				break;

			case "boolean":
				elements[key] = sanitize.boolean(value);
				break;

			default:
				elements[key] = "";
				break;
		}
	});

	return elements;
};

export default castSchema;
