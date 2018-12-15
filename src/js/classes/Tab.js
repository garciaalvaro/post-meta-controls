import l, { setSchema } from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Tab extends Base {
	setPrivates() {
		this.props_privates = ["class_name"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "tab",
			id: uuid(),
			path: [],
			label: ""
		};
	}

	setSchema() {
		this.props_schema = {
			class_name: {
				type: "id",
				conditions: "not_empty"
			},
			id: {
				type: "id",
				conditions: "not_empty"
			},
			path: {
				type: "array_id",
				conditions: "not_empty"
			},
			label: {
				type: "text",
				conditions: "not_empty"
			}
		};
	}
}

export default Tab;
