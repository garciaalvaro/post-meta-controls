import { Setting } from "../Setting";

interface Props {
	props_raw: CheckboxPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: CheckboxProps;
	props_schema: CheckboxPropsSchema;
}

export class Checkbox extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "checkbox",
				default_value: false,
				input_label: "",
				use_toggle: false,
			},

			props_schema: {
				default_value: {
					type: "boolean",
				},
				input_label: {
					type: "text",
					conditions: "not_empty",
				},
				use_toggle: {
					type: "boolean",
				},
			},
		});
	}
}
