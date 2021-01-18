import { Setting } from "../Setting";

interface Props {
	props_raw: ImageMultiplePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: ImageMultipleProps;
	props_schema: ImageMultiplePropsSchema;
}

export class ImageMultiple extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "image_multiple",
				default_value: [],
			},

			props_schema: {
				default_value: {
					type: { _all: "integer" },
				},
			},
		});
	}
}
