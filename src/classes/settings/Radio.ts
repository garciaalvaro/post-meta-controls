import { prepareOptions } from "utils/tools";
import { Setting } from "../Setting";

interface Props {
	props_raw: RadioPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: RadioProps;
	props_schema: RadioPropsSchema;
}

export class Radio extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "radio",
				default_value: "",
				options: [],
			},

			props_schema: {
				default_value: {
					type: "id",
				},
				options: {
					type: { _all: { value: "id", label: "text" } },
					conditions: "not_empty",
				},
			},
		});
	}

	beforeSetSchema = (props_raw: SettingProps): SettingProps => {
		props_raw = super.beforeSetSchema(props_raw);

		// @ts-expect-error TODO
		props_raw.options = prepareOptions(props_raw.options);

		return props_raw;
	};
}
