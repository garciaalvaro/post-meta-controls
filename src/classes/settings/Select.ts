import { prepareOptions } from "utils/tools";
import { Setting } from "../Setting";

interface Props {
	props_raw: SelectPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: SelectProps;
	props_schema: SelectPropsSchema;
}

export class Select extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "select",
				default_value: "",
				options: []
			},

			props_schema: {
				default_value: {
					type: "id"
				},
				options: {
					type: { _all: { value: "id", label: "text" } },
					conditions: "not_empty"
				}
			}
		});
	}

	beforeSetSchema = (props_raw: SettingProps): SettingProps => {
		props_raw = super.beforeSetSchema(props_raw);

		// @ts-ignore
		props_raw.options = prepareOptions(props_raw.options);

		return props_raw;
	};
}
