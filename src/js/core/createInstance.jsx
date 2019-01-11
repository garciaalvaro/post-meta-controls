import l from "../utils";
import classes from "../classes";

const {
	Sidebar,
	Tab,
	Panel,
	// Settings:
	Buttons,
	Checkbox,
	CheckboxMultiple,
	Color,
	CustomText,
	DateTime,
	Image,
	ImageMultiple,
	Radio,
	Range,
	Select,
	Text,
	Textarea,
	// Pro:
	CustomHTML
} = classes;
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
			case "buttons":
				instance = new Buttons(props_raw);
				break;

			case "checkbox":
				instance = new Checkbox(props_raw);
				break;

			case "checkbox_multiple":
				instance = new CheckboxMultiple(props_raw);
				break;

			case "color":
				instance = new Color(props_raw);
				break;

			case "custom_text":
				instance = new CustomText(props_raw);
				break;

			case "date_time":
				instance = new DateTime(props_raw);
				break;

			case "image":
				instance = new Image(props_raw);
				break;

			case "image_multiple":
				instance = new ImageMultiple(props_raw);
				break;

			case "radio":
				instance = new Radio(props_raw);
				break;

			case "range":
				instance = new Range(props_raw);
				break;

			case "select":
				instance = new Select(props_raw);
				break;

			case "text":
				instance = new Text(props_raw);
				break;

			case "textarea":
				instance = new Textarea(props_raw);
				break;

			case "custom_html":
				if (typeof CustomHTML === "function") {
					instance = new CustomHTML(props_raw);
				}
				break;

			default:
				break;
		}
	}

	return instance;
};

export default createInstance;
