import l from "../utils";
import createInstance from "./createInstance.jsx";

const { __, sprintf } = wp.i18n;
const { isArray, forEach } = lodash;

const createSidebars = props_raw => {
	if (
		!isArray(props_raw.sidebars) ||
		!isArray(props_raw.tabs) ||
		!isArray(props_raw.panels) ||
		!isArray(props_raw.settings)
	) {
		return;
	}

	const { sidebars, tabs, panels, settings } = props_raw;

	const ids = [];
	const data_keys = [];
	/* translators: %s: property name. */
	const already_exists_message = __(
		"The value '%s' has already been assigned to an element."
	);

	const createInstanceHelper = (element, name) => {
		const instance = createInstance(element, name);

		if (instance === false) {
			return;
		}

		const id = instance.getId();
		if (ids.includes(id)) {
			const message = sprintf(already_exists_message, id);
			instance.addWarning("id", message);
		} else {
			ids.push(id);
		}

		// We are allowing several controls to share the same data_key.
		// To prevent it, uncomment the code below.
		/*
		if (name === "setting" && instance.getDataType() !== "none") {
			const data_key = instance.getDataKey();
			if (data_keys.includes(data_key)) {
				const message = sprintf(already_exists_message, data_key);
				instance.addWarning("data_key", message);
			} else {
				data_keys.push(data_key);
			}
		}
		*/

		instance.dispatch();

		if (name === "sidebar") {
			instance.registerPlugin();
		}
	};

	forEach(sidebars, sidebar => createInstanceHelper(sidebar, "sidebar"));
	forEach(tabs, tab => createInstanceHelper(tab, "tab"));
	forEach(panels, panel => createInstanceHelper(panel, "panel"));
	forEach(settings, setting => createInstanceHelper(setting, "setting"));
};

export default createSidebars;
