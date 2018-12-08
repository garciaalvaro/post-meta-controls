import l, { setSchema } from "../utils";
import Base from "./Base";

class Setting extends Base {
	getPropsDefault() {
		const defaults = {
			class_name: "setting",
			id: "",
			path: [],
			index: "",
			meta_key: "",
			meta_key_prefix: "ps_",
			type: "",
			label: "",
			description: "",
			default: "",
			help: "",
			post_type: "post",
			meta_type: "string",
			types_can_have_meta: ["checkbox", "radio"]
		};
		const defaults_type = this.getPropsDefaultType();

		return { ...defaults, ...defaults_type };
	}

	getPropsSchema() {
		const schema = {
			class_name: { type: "id" },
			id: { type: "id" },
			path: { type: "array_string" },
			index: { type: "integer" },
			meta_key: { type: "id" },
			meta_key_prefix: {
				type: "id" // TODO min length?
			},
			type: { type: "id" },
			label: { type: "text" },
			description: { type: "text" },
			default: { type: "id" },
			help: { type: "text" },
			post_type: { type: "id" },
			meta_type: { type: "id" },
			types_can_have_meta: { type: "array_string" }
		};

		const required_keys = [
			"class_name",
			"id",
			"path",
			"index",
			"type",
			"post_type",
			"types_can_have_meta"
		];
		const private_keys = [
			"types_can_have_meta",
			"class_name",
			"id",
			"meta_type"
		];
		const non_empty_values = ["id"];

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
