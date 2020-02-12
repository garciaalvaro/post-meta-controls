import uuid from "uuid/v4";

import { Base } from "./Base";

export interface Props {
	props: SettingProps;
	props_raw: SettingPropsRaw;
	props_privates: SettingPropsPrivates;
	props_defaults: SettingProps;
	props_schema: SettingPropsSchema;
}

interface PropsReceived {
	props_raw: SettingPropsRawReceived;
	props_defaults: SettingPropsReceived;
	props_schema: SettingPropsSchemaReceived;
}

export class Setting<T extends PropsReceived> extends Base<Props> {
	constructor({ props_raw, props_defaults, props_schema }: T) {
		super({
			props_raw,

			props_privates: ["class_name", "warnings"],

			props_defaults: {
				...props_defaults,
				class_name: "setting",
				warnings: [],
				id: uuid(),
				path: [],
				label: "",
				help: "",
				data_type: "none",
				meta_key_exists: false,
				data_key_with_prefix: "",
				ui_border_top: true
			},

			props_schema: {
				...props_schema,
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
				meta_key_exists: {
					type: "boolean"
				},
				data_key_with_prefix: {
					type: "id",
					conditions:
						props_raw.data_type !== "none" ? "not_empty" : false
				},
				ui_border_top: {
					type: "boolean"
				}
			}
		});
	}

	beforeSetSchema = (props_raw: SettingProps): SettingProps =>
		this.prepareDataType(props_raw);

	prepareDataType = (props_raw: SettingProps): SettingProps => {
		const { data_type, type } = props_raw;
		const types_can_have_meta = [
			"buttons",
			"checkbox",
			"checkbox_multiple",
			"color",
			"date_range",
			"date_single",
			"image",
			"image_multiple",
			"repeatable",
			"radio",
			"range",
			"range_float",
			"select",
			"text",
			"textarea"
		];

		if (data_type === "meta" && types_can_have_meta.includes(type)) {
			return props_raw;
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
			"repeatable",
			"radio",
			"range",
			"range_float",
			"select"
		];

		if (
			data_type === "localstorage" &&
			types_can_have_localstorage.includes(type)
		) {
			return props_raw;
		}

		return {
			...props_raw,
			data_type: "none",
			data_key_with_prefix: ""
		};
	};

	getDataType = () => this.props.data_type;

	getDataKey = () => this.props.data_key_with_prefix;
}
