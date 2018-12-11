import l, { setSchema } from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

const { get, merge } = lodash;

class Setting extends Base {
	getPropsDefault() {
		let defaults = {
			class_name: "setting",
			id: uuid(),
			data_type: "none",
			path: [],
			index: "",
			type: "",
			label: "",
			description: "",
			help: "",
			metadata_exists: false
		};
		const data_type = get(this.props, "data_type");
		if (data_type === "meta" || data_type === "localstorage") {
			merge(defaults, {
				data_key_with_prefix: ""
			});
		}

		const defaults_type = this.getPropsDefaultType();

		return { ...defaults, ...defaults_type };
	}

	getPropsSchema() {
		let schema = {
			class_name: { type: "id" },
			id: { type: "id" },
			data_type: { type: "id" },
			path: { type: "array_string" },
			index: { type: "integer" },
			type: { type: "id" },
			label: { type: "text" },
			description: { type: "text" },
			help: { type: "text" },
			metadata_exists: { type: "bool" }
		};
		let required_keys = ["class_name", "id", "path", "index", "type"];
		let private_keys = ["class_name"];
		let conditions = { id: "not_empty" };

		const data_type = get(this.props, "data_type");
		if (data_type === "meta" || data_type === "localstorage") {
			merge(schema, {
				data_key_with_prefix: { type: "id" }
			});
			required_keys.push("data_key_with_prefix");
			conditions.data_key_with_prefix = "not_empty";
		}

		setSchema(schema, required_keys, private_keys, conditions);

		const schema_type = this.getPropsSchemaType();

		return { ...schema, ...schema_type };
	}

	prePropsValidation() {
		this.assignPropId();
		// this.assignPropMetaPrefix();
	}

	postPropsValidation() {
		// this.register_meta();
	}

	// assignPropMetaPrefix() {
	// 	if (
	// 		isEmpty(this.props_raw["meta_key"]) ||
	// 		isEmpty(this.props_raw["meta_key_prefix"])
	// 	) {
	// 		return false;
	// 	}

	// 	this.props_raw["meta_key"] =
	// 		this.props_raw["meta_key_prefix"] + this.props_raw["meta_key"];
	// }
}

export default Setting;
