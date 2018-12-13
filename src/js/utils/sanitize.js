import l from "./log";

const {
	isString,
	isArray,
	isBoolean,
	isObject,
	forEach,
	escape,
	toSafeInteger,
	toNumber,
	deburr
} = lodash;

const sanitizeId = value => {
	if (!isString(value)) {
		return "";
	}
	value = deburr(value);
	value = value.replace(/[^\w-]/g, "");

	return value;
};

const sanitizeText = value => {
	if (!isString(value)) {
		return "";
	}
	return escape(value);
};

const sanitizeTextarea = value => {
	// if (!isString(value)) {
	// 	return "";
	// }
	// return escape(value);
	return value;
};

const sanitizeBoolean = value => {
	return isBoolean(value) && value === true ? true : false;
};

const sanitizeFloat = value => {
	value = toNumber(value);
	value = Math.abs(value);
	value = Math.round(100 * value) / 100;

	return value;
};

const sanitizeInteger = value => {
	value = toSafeInteger(value);
	value = Math.abs(value);

	return value;
};

const sanitizeArray = value => {
	if (!isArray(value)) {
		return [];
	}

	return value;
};

const sanitizeObject = value => {
	if (!isObject(value)) {
		return {};
	}

	return value;
};

const sanitizeArrayInteger = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeInteger(array_value);
	});

	return value;
};

const sanitizeArrayString = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeText(array_value);
	});

	return value;
};

const sanitizeObjectString = value => {
	value = sanitizeObject(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeText(array_value);
	});

	return value;
};

const sanitizeArrayObjectString = value => {
	value = sanitizeArray(value);

	forEach(value, (array_value, array_index) => {
		value[array_index] = sanitizeObjectString(array_value);
	});

	return value;
};

export default {
	id: sanitizeId,
	text: sanitizeText,
	textarea: sanitizeTextarea,
	boolean: sanitizeBoolean,
	float: sanitizeFloat,
	integer: sanitizeInteger,
	array: sanitizeArray,
	object: sanitizeObject,
	arrayInteger: sanitizeArrayInteger,
	arrayString: sanitizeArrayString,
	objectString: sanitizeObjectString,
	arrayObjectString: sanitizeArrayObjectString
};
