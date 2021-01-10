import { Setting } from "../Setting";

interface Props {
	props_raw: DateRangePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: DateRangeProps;
	props_schema: DateRangePropsSchema;
}

export class DateRange extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "date_range",
				default_value: [],
				format: "DD/MM/YYYY",
				locale: "en",
				unavailable_dates: [["before", "today"]],
				minimum_days: 1,
				maximum_days: 0,
			},

			props_schema: {
				default_value: {
					type: { _all: "text" },
				},
				format: {
					type: "text",
				},
				locale: {
					type: "id",
				},
				unavailable_dates: {
					type: { _all: { _all: "text" } },
				},
				minimum_days: {
					type: "integer",
				},
				maximum_days: {
					type: "integer",
				},
			},
		});
	}
}
