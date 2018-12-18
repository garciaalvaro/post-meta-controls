import l from "../utils";
import createInstance from "./createInstance.jsx";

const { __, sprintf } = wp.i18n;
const { isArray, forEach } = lodash;

const createSidebars = raw_props => {
	l("createSidebars");
	if (
		!isArray(raw_props.sidebars) ||
		!isArray(raw_props.tabs) ||
		!isArray(raw_props.panels) ||
		!isArray(raw_props.settings)
	) {
		return;
	}

	const { sidebars, tabs, panels, settings } = raw_props;

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

		if (name === "setting") {
			const data_key = instance.getDataKey();
			if (data_keys.includes(data_key)) {
				const message = sprintf(already_exists_message, data_key);
				instance.addWarning("data_key", message);
			} else {
				data_keys.push(data_key);
			}
		}

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
