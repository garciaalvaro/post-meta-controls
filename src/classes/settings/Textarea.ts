import { Setting } from "../Setting";

interface Props {
	props_raw: TextareaPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: TextareaProps;
	props_schema: TextareaPropsSchema;
}

export class Textarea extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "textarea",
				default_value: "",
				placeholder: ""
			},

			props_schema: {
				default_value: {
					type: "text"
				},
				placeholder: {
					type: "text"
				}
			}
		});
	}
}
