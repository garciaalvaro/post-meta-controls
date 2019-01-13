import l from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Setting extends Base {
	beforeSetSchema() {
		this.prepareDataType();
	}

	prepareDataType() {
		const types_can_have_meta = [
			"buttons",
			"checkbox",
			"checkbox_multiple",
			"color",
			"date_range",
			"date_single",
			"image",
			"image_multiple",
			"radio",
			"range",
			"range_float",
			"select",
			"text",
			"textarea"
		];
		if (
			this.props.data_type === "meta" &&
			types_can_have_meta.includes(this.props.type)
		) {
			return;
		}

		const types_can_have_localstorage = [
			"buttons",
			"checkbox",
			"checkbox_multiple",
			"color",
			"date_range",
			"date_single",
			"radio",
			"range",
			"range_float",
			"select"
		];
		if (
			this.props.data_type === "localstorage" &&
			types_can_have_localstorage.includes(this.props.type)
		) {
			return;
		}

		this.props.data_type = "none";
		this.props.data_key_with_prefix = "";
	}

	getDataType() {
		return this.props.data_type;
	}

	getDataKey() {
		return this.props.data_key_with_prefix;
	}

	setPrivates() {
		return ["class_name", "warnings"];
	}

	getDefaults() {
		return {
			class_name: "setting",
			warnings: [],
			id: uuid(),
			path: [],
			label: "",
			type: "",
			description: "",
			help: "",
			data_type: "none",
			metadata_exists: false,
			data_key_with_prefix: ""
		};
	}

	getSchema() {
		return {
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
				type: "text"
			},
			type: {
				type: "id",
				conditions: "not_empty"
			},
			description: {
				type: "text"
			},
			help: {
				type: "text"
			},
			data_type: {
				type: "id"
			},
			metadata_exists: {
				type: "boolean"
			},
			data_key_with_prefix: {
				type: "id",
				conditions:
					this.props.data_type !== "none" ? "not_empty" : false
			}
		};
	}
}

export default Setting;
