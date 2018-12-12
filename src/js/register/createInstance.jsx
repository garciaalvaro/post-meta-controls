import l, { plugin_namespace_dash, icons } from "../utils";
import Sidebar from "../classes/Sidebar";
import Tab from "../classes/Tab";
import Panel from "../classes/Panel";
import Checkbox from "../classes/Setting-Checkbox";
import Radio from "../classes/Setting-Radio";
import Select from "../classes/Setting-Select";
import Range from "../classes/Setting-Range";
import Text from "../classes/Setting-Text";
import Textarea from "../classes/Setting-Textarea";
import Color from "../classes/Setting-Color";

const { isUndefined } = lodash;

const createInstance = (props_raw, class_name) => {
	let class_instance = false;

	switch (class_name) {
		case "sidebar":
			class_instance = new Sidebar(props_raw);
			break;

		case "tab":
			class_instance = new Tab(props_raw);
			break;

		case "panel":
			class_instance = new Panel(props_raw);
			break;

		case "setting":
			if (isUndefined(props_raw.type)) {
				break;
			}

			const { type } = props_raw;

			if ("checkbox" === type) {
				class_instance = new Checkbox(props_raw);
			} else if ("radio" === type) {
				class_instance = new Radio(props_raw);
			} else if ("select" === type) {
				class_instance = new Select(props_raw);
			} else if ("range" === type) {
				class_instance = new Range(props_raw);
			} else if ("text" === type) {
				class_instance = new Text(props_raw);
			} else if ("textarea" === type) {
				class_instance = new Textarea(props_raw);
			} else if ("color" === type) {
				class_instance = new Color(props_raw);
			}
			break;

		default:
			break;
	}

	if (
		class_instance === false ||
		(!class_instance.isValid() && class_name !== "setting")
	) {
		return;
	}

	class_instance.dispatch();

	if (class_name === "sidebar") {
		class_instance.registerPlugin();
	}
};

export default createInstance;
