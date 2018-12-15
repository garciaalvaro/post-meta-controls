import l from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Panel extends Base {
	setPrivates() {
		this.props_privates = ["class_name"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "panel",
			id: uuid(),
			path: [],
			label: "",
			initial_open: false,
			with_container: true
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
			},
			initial_open: {
				type: "boolean"
			},
			with_container: {
				type: "boolean"
			}
		};
	}
}

export default Panel;
