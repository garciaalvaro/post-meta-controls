import l from "utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Tab extends Base {
	setPrivates() {
		this.props_privates = ["class_name", "warnings"];
	}

	setDefaults() {
		this.props_defaults = {
			class_name: "tab",
			warnings: [],
			id: uuid(),
			path: [],
			label: "",
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
				conditions: "not_empty"
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

export default Tab;
