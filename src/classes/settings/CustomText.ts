import { Setting } from "../Setting";

interface Props {
	props_raw: CustomTextPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: CustomTextProps;
	props_schema: CustomTextPropsSchema;
}

export class CustomText extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "custom_text",
				content: [],
			},

			props_schema: {
				content: {
					type: {
						_all: {
							type: "id",
							content: { _all: "text" },
							href: "url",
						},
					},
					conditions: "not_empty",
				},
			},
		});
	}
}
