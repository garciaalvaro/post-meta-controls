import l from "utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Panel extends Base {
	setPrivates() {
		this.props_privates = ["class_name", "warnings"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "panel",
			warnings: [],
			id: uuid(),
			path: [],
			label: "",
			initial_open: false,
			collapsible: true,
			icon_dashicon: "",
			icon_svg: ""
		};
	}

	setSchema() {
		this.props_schema = {
			class_name: {
				type: "id",
				conditions: "not_empty"
			},
			warnings: {
				type: { _all: { title: "text", message: "text" } }
			},
			id: {
				type: "id",
				conditions: "not_empty"
			},
			path: {
				type: { _all: "id" },
				conditions: "not_empty"
			},
			label: {
				type: "text",
				conditions: this.props.collapsible === true ? "not_empty" : false
			},
			initial_open: {
				type: "boolean"
			},
			collapsible: {
				type: "boolean"
			},
			icon_dashicon: {
				type: "id"
			},
			icon_svg: {
				type: "html"
			}
		};
	}
}

export default Panel;
