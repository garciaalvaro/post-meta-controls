import l, { store_slug } from "../utils";

const { isUndefined } = lodash;
const { dispatch } = wp.data;

const initialDispatch = element => {
	l(element);
	if (element.valid !== true || isUndefined(dispatch(store_slug))) {
		return;
	}
	const { class_name } = element;
	const { valid, index, ...filtered_props } = element;

	if (class_name === "sidebar") {
		dispatch(store_slug).addSidebar(filtered_props);
	} else if (class_name === "tab") {
		dispatch(store_slug).addTab(filtered_props);
	} else if (class_name === "panel") {
		dispatch(store_slug).addPanel(filtered_props);
	} else if (class_name === "setting") {
		dispatch(store_slug).addSetting(filtered_props);
	}
};

export default initialDispatch;
