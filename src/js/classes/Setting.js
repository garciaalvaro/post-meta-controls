import l from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Setting extends Base {
	beforeSetSchema() {
		this.prepareDataType();
	}

	prepareDataType() {
		const { data_type, type } = this.props;
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

		if (data_type === "meta" && types_can_have_meta.includes(type)) {
			return;
		}

		const types_can_have_localstorage = [
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
			"select"
		];

		if (
			data_type === "localstorage" &&
			types_can_have_localstorage.includes(type)
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
			help: "",
			data_type: "none",
			metadata_exists: false,
			data_key_with_prefix: "",
			ui_border_top: true
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
			},
			ui_border_top: {
				type: "boolean"
			}
		};
	}
}

export default Setting;
