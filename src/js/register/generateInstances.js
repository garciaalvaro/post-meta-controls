import l from "../utils";
import Sidebar from "../classes/Sidebar";
import Tab from "../classes/Tab";
import Panel from "../classes/Panel";
import Checkbox from "../classes/Setting-Checkbox";
import Radio from "../classes/Setting-Radio";
import Select from "../classes/Setting-Select";
import Range from "../classes/Setting-Range";

const { isArray, isObject, forEach, isEmpty } = lodash;

const generateInstances = (class_name, elements, path, instances) => {
	if (!isArray(elements)) {
		return instances;
	}

	let instances_array = [];

	forEach(elements, (element, index) => {
		if (!isObject(element)) {
			return;
		}

		let class_instance = false;
		let is_valid = false;
		let id = "";
		let children_els = [];
		let children_class_name = "";

		element.path = path;
		element.index = index;

		if ("sidebar" === class_name && !isEmpty(element.tabs)) {
			class_instance = new Sidebar(element);
			children_els = element.tabs;
			children_class_name = "tab";
		} else if ("tab" === class_name && !isEmpty(element.panels)) {
			class_instance = new Tab(element);
			children_els = element.panels;
			children_class_name = "panel";
		} else if ("panel" === class_name && !isEmpty(element.settings)) {
			class_instance = new Panel(element);
			children_els = element.settings;
			children_class_name = "setting";
		} else if ("setting" === class_name && !isEmpty(element.type)) {
			if ("checkbox" === element.type) {
				class_instance = new Checkbox(element);
			} else if ("radio" === element.type) {
				class_instance = new Radio(element);
			} else if ("select" === element.type) {
				class_instance = new Select(element);
			} else if ("range" === element.type) {
				class_instance = new Range(element);
			} else if ("custom_component" === element.type) {
				// class_instance = new CustomComponent( element );
			}
		}

		if (class_instance !== false) {
			is_valid = class_instance.isValid();
			id = class_instance.getId();
		}

		if (true !== is_valid && "setting" !== class_name) {
			return;
		}

		instances_array.push(class_instance.getProps());

		if ("setting" !== class_name) {
			instances = generateInstances(
				children_class_name,
				children_els,
				path.concat(id),
				instances
			);
		}
	});

	instances[`${class_name}s`] = instances_array;

	return instances;
};

export default generateInstances;
