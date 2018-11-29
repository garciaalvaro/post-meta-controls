import l from "../utils";
import Sidebar from "../classes/Sidebar";
import Tab from "../classes/Tab";
import Panel from "../classes/Panel";
import Checkbox from "../classes/Setting-Checkbox";
import Radio from "../classes/Setting-Radio";

const { isArray, isObject, forEach, isEmpty } = lodash;

const createInstance = (class_type, elements, path) => {
	if (!isArray(elements)) {
		return false;
	}

	let props = [];

	forEach(elements, (element, index) => {
		if (!isObject(element)) {
			return;
		}

		let class_instance = false;
		let is_valid = false;
		let id = "";
		let children_els = [];
		let children_type = "";

		element.path = path;
		element.index = index;

		if ("sidebar" === class_type && !isEmpty(element.tabs)) {
			class_instance = new Sidebar(element);
			children_els = element.tabs;
			children_type = "tabs";
		} else if ("tabs" === class_type && !isEmpty(element.panels)) {
			class_instance = new Tab(element);
			children_els = element.panels;
			children_type = "panels";
		} else if ("panels" === class_type && !isEmpty(element.settings)) {
			class_instance = new Panel(element);
			children_els = element.settings;
			children_type = "settings";
		} else if ("settings" === class_type && !isEmpty(element.type)) {
			if ("checkbox" === element.type) {
				class_instance = new Checkbox(element);
			} else if ("radio" === element.type) {
				class_instance = new Radio(element);
			} else if ("custom_component" === element.type) {
				// class_instance = new CustomComponent( element );
			}
		}

		if (class_instance !== false) {
			is_valid = class_instance.isValid();
			id = class_instance.getId();
		}

		if (true !== is_valid || isEmpty(id)) {
			return;
		}

		const props_this = class_instance.getProps();

		if ("settings" !== class_type) {
			props_this[children_type] = createInstance(
				children_type,
				children_els,
				path.concat(id)
			);
		}
		props = props.concat(props_this);
	});

	return props;
};

export default createInstance;
