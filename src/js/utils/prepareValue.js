const { isUndefined } = lodash;

const prepareValue = (setting, getPersistedProp, getEditedPostAttribute) => {
	let {
		data_type,
		value,
		default_value,
		data_key_with_prefix,
		metadata_exists
	} = setting;
	const use_meta = data_type === "meta";
	const use_localstorage = data_type === "localstorage";

	// If the data_type is meta we will get the value from
	// the "core/editor" store.
	if (use_meta && metadata_exists) {
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
};

export default prepareValue;
