import l from "../utils";
import {
	Sidebar,
	Tab,
	Panel,
	Checkbox,
	Radio,
	Select,
	Range,
	Text,
	Textarea,
	Color,
	Image
} from "../classes";

const { isUndefined } = lodash;

const createInstance = (props_raw, class_name) => {
	let instance = false;

	if (class_name === "sidebar") {
		instance = new Sidebar(props_raw);
	} else if (class_name === "tab") {
		instance = new Tab(props_raw);
	} else if (class_name === "panel") {
		instance = new Panel(props_raw);
	} else if (class_name === "setting" && !isUndefined(props_raw.type)) {
		const { type } = props_raw;

		switch (type) {
			case "checkbox":
				instance = new Checkbox(props_raw);
				break;

			case "radio":
				instance = new Radio(props_raw);
				break;

			case "select":
				instance = new Select(props_raw);
				break;

			case "range":
				instance = new Range(props_raw);
				break;

			case "text":
				instance = new Text(props_raw);
				break;

			case "textarea":
				instance = new Textarea(props_raw);
				break;

			case "color":
				instance = new Color(props_raw);
				break;

			case "image":
				instance = new Image(props_raw);
				break;

			default:
				break;
		}
	}

	return instance;
};

export default createInstance;
