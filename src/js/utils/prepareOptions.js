import sanitize from "./sanitize";

const { forEach, isString, isObject } = lodash;

const prepareOptions = options => {
	options = sanitize.array(options);

	const options_clean = [];

	forEach(options, (value, key) => {
		// If the option is already prepared
		if (isObject(value) && isString(value.value) && isString(value.label)) {
			options_clean.push({
				value: value.value,
				label: value.label
			});
			return;
		}

		if (!isString(value)) {
			return;
		}

		options_clean.push({
			value: key,
			label: value
		});
	});

	return options_clean;
};

export default prepareOptions;
