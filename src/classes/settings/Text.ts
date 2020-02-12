import { Setting } from "../Setting";

interface Props {
	props_raw: TextPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: TextProps;
	props_schema: TextPropsSchema;
}

export class Text extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "text",
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
