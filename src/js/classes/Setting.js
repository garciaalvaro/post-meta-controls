import l, { setSchema } from "../utils";
import Base from "./Base";

const { get, merge } = lodash;

class Setting extends Base {
	getPropsDefault() {
		let defaults = {
			class_name: "setting",
			id: "",
			data_type: "none",
			path: [],
			index: "",
			type: "",
			label: "",
			description: "",
			default: "",
			help: ""
		};
		if (get(this.props, "data_type") === "meta") {
			merge(defaults, {
				meta_key_with_prefix: ""
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
			default: { type: "id" },
			help: { type: "text" }
		};
		let required_keys = ["class_name", "id", "path", "index", "type"];
		let private_keys = ["class_name", "id"];
		let non_empty_values = ["id"];

		if (get(this.props, "data_type") === "meta") {
			merge(schema, {
				meta_key_with_prefix: { type: "text" }
			});
			required_keys.push("meta_key_with_prefix");
			non_empty_values.push("meta_key_with_prefix");
		}

		setSchema(schema, required_keys, private_keys, non_empty_values);

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
