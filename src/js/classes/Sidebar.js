import l, { setSchema } from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Sidebar extends Base {
	getPropsDefault() {
		return {
			class_name: "sidebar",
			id: uuid(),
			label: "",
			description: "",
			// 'icon_url'    : '',// TODO
			post_type: "post",
			active_tab: false,
			settings_id: []
		};
	}

	getPropsSchema() {
		const schema = {
			class_name: { type: "id" },
			id: { type: "id" },
			label: { type: "text" },
			description: { type: "text" },
			// icon_url: { type: "id" }, // TODO
			post_type: { type: "id" },
			active_tab: { type: "bool" },
			settings_id: { type: "array_string" }
		};

		const required_keys = [
			"class_name",
			"id",
			"label",
			"post_type",
			"active_tab"
		];
		const private_keys = ["class_name", "active_tab", "settings_id"];
		const non_empty_values = ["id"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}
}

export default Sidebar;
