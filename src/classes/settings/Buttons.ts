import { Setting } from "../Setting";

interface Props {
	props_raw: ButtonsPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: ButtonsProps;
	props_schema: ButtonsPropsSchema;
}

export class Buttons extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "buttons",
				default_value: "",
				allow_empty: false,
				options: []
			},

			props_schema: {
				default_value: {
					type: "id"
				},
				allow_empty: {
					type: "boolean"
				},
				options: {
					type: {
						_all: {
							value: "id",
							title: "text",
							icon_dashicon: "id",
							icon_svg: "html"
						}
					},
					conditions: "not_empty"
				}
			}
		});
	}
}
