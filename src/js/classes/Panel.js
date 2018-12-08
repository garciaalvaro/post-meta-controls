import l, { setSchema } from "../utils";
import Base from "./Base";

class Panel extends Base {
	getPropsDefault() {
		return {
			class_name: "panel",
			id: "",
			path: [],
			index: "",
			label: "",
			initial_open: false,
			with_container: true,
			post_type: "post"
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
			},
			post_type: {
				type: "id"
			}
		};

		const required_keys = [
			"class_name",
			"id",
			"path",
			"index",
			"label",
			"post_type"
		];
		const private_keys = ["class_name", "id"];
		const non_empty_values = ["id"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}

	prePropsValidation() {
		this.assignPropId();
	}
}

export default Panel;
