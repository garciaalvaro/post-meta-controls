import l from "../utils";
import createInstance from "./createInstance.jsx";

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

	forEach(sidebars, sidebar => {
		const instance = createInstance(sidebar, "sidebar");
		// l("sidebar", instance.isValid());
		// if (instance.isValid()) {
		instance.dispatch();
		instance.registerPlugin();
		// }
	});
	forEach(tabs, tab => {
		const instance = createInstance(tab, "tab");
		instance.dispatch();
	});
	forEach(panels, panel => {
		const instance = createInstance(panel, "panel");
		instance.dispatch();
	});
	forEach(settings, setting => {
		const instance = createInstance(setting, "setting");
		if (instance !== false) {
			instance.dispatch();
		}
	});
};

export default createSidebars;
