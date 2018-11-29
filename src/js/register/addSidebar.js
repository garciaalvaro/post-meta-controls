import l, { store_slug } from "../utils";
import createInstance from "./createInstance";
import registerSidebar from "./registerSidebar";

const { isObject, isUndefined, isEmpty, get } = lodash;
const { select } = wp.data;

const addSidebar = sidebar_props_raw => {
	if (
		!isObject(sidebar_props_raw) ||
		// isEmpty(sidebar_props_raw.id) || // Cant be 0
		isUndefined(select(store_slug))
	) {
		return;
	}

	const props = createInstance("sidebar", [sidebar_props_raw], []);

	const id = get(props, ["0", "id"]);

	const sidebar = select(store_slug).getSidebar(id);

	if (isUndefined(sidebar) || isEmpty(sidebar.settings_id)) {
		return;
	}

	registerSidebar(sidebar);
};

export default addSidebar;
