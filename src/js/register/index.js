import l from "../utils";
import createStore from "../store";
import createInstance from "./createInstance.jsx";

const { isArray, forEach } = lodash;
const { applyFilters } = wp.hooks;

const init = () => {
	const ps = applyFilters("ps_add_sidebars", []);

	createStore();

	forEach(ps, sidebar_obj => {
		if (
			!isArray(sidebar_obj.sidebars) ||
			!isArray(sidebar_obj.tabs) ||
			!isArray(sidebar_obj.panels) ||
			!isArray(sidebar_obj.settings)
		) {
			return;
		}

		const { sidebars, tabs, panels, settings } = sidebar_obj;

		forEach(sidebars, sidebar => createInstance(sidebar, "sidebar"));
		forEach(tabs, tab => createInstance(tab, "tab"));
		forEach(panels, panel => createInstance(panel, "panel"));
		forEach(settings, setting => createInstance(setting, "setting"));
	});
};

init();
