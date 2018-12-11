import l, { setSchema } from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Panel extends Base {
	getPropsDefault() {
		return {
			class_name: "panel",
			id: uuid(),
			path: [],
			index: "",
			label: "",
			initial_open: false,
			with_container: true
		};
	}

	getPropsSchema() {
		const schema = {
			class_name: {
				type: "id"
			},
			id: {
				type: "id"
			},
			path: {
				type: "array_string"
			},
			index: {
				type: "integer"
			},
			label: {
				type: "text"
			},
			initial_open: {
				type: "bool"
			},
			with_container: {
				type: "bool"
			}
		};

		const required_keys = ["class_name", "id", "path", "index", "label"];
		const private_keys = ["class_name"];
		const conditions = { id: "not_empty" };

		setSchema(schema, required_keys, private_keys, conditions);

		return schema;
	}

	prePropsValidation() {
		this.assignPropId();
	}
}

export default Panel;
