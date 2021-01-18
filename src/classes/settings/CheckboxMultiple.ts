import { prepareOptions } from "@/utils/tools";
import { Setting } from "../Setting";

interface Props {
	props_raw: CheckboxMultiplePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: CheckboxMultipleProps;
	props_schema: CheckboxMultiplePropsSchema;
}

export class CheckboxMultiple extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "checkbox_multiple",
				default_value: [],
				options: [],
				use_toggle: false,
			},

			props_schema: {
				default_value: {
					type: { _all: "id" },
				},
				options: {
					type: { _all: { value: "id", label: "text" } },
					conditions: "not_empty",
				},
				use_toggle: {
					type: "boolean",
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
