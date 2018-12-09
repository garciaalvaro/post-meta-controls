import l from "../utils";
import createStore from "../store";
import generateInstances from "./generateInstances";
import initialDispatch from "./initialDispatch";
import registerPluginInEditor from "./registerPluginInEditor";
// import "./_test";

const { isArray, forEach } = lodash;
const { applyFilters } = wp.hooks;

const init = () => {
	const sidebars_props_raw = applyFilters("ps_add_sidebars", []);

	if (!isArray(sidebars_props_raw)) {
		return;
	}

	const instances = generateInstances("sidebar", sidebars_props_raw, [], {});

	createStore();

	forEach(instances, elements => {
		forEach(elements, element => {
			initialDispatch(element);
		});
	});
	forEach(instances.sidebars, registerPluginInEditor);
};

init();
