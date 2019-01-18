const { isUndefined, compact } = lodash;

const prepareValue = (setting, getPersistedProp, getEditedPostAttribute) => {
	let {
		type,
		data_type,
		value,
		default_value,
		data_key_with_prefix,
		meta_key_exists
	} = setting;
	const use_meta = data_type === "meta";
	const use_localstorage = data_type === "localstorage";

	// If the data_type is meta we will get the value from
	// the "core/editor" store.
	if (use_meta && meta_key_exists) {
		value = getEditedPostAttribute("meta")[data_key_with_prefix];
	}

	// If the data_type is localstorage we will get the value from
	// the settings_persisted prop of the plugin store.
	if (use_localstorage && isUndefined(value)) {
		value = getPersistedProp(data_key_with_prefix);
	}

	// If there is no value yet set the default.
	if (isUndefined(value)) {
		value = default_value;
	}

	// Remove empty string '' or 0 which is saved when there is no value.
	if (
		type === "image_multiple" ||
		(type === "checkbox_multiple" && value.length === 1) ||
		(type === "date_range" && value.length === 1)
	) {
		value = compact(value);
	}

	return value;
};

export default prepareValue;
