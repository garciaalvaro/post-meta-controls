import { Setting } from "../Setting";

interface Props {
	props_raw: DateSinglePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: DateSingleProps;
	props_schema: DateSinglePropsSchema;
}

export class DateSingle extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "date_single",
				default_value: "",
				format: "DD/MM/YYYY",
				locale: "en"
			},

			props_schema: {
				default_value: {
					type: "text"
				},
				format: {
					type: "text"
				},
				locale: {
					type: "id"
				}
			}
		});
	}
}
