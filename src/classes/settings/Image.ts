import { Setting } from "../Setting";

interface Props {
	props_raw: ImagePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: ImageProps;
	props_schema: ImagePropsSchema;
}

export class Image extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "image",
				default_value: 0
			},

			props_schema: {
				default_value: {
					type: "integer"
				}
			}
		});
	}
}
