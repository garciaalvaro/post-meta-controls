import { isUndefined } from "lodash";
import { __, sprintf } from "@wordpress/i18n";

import { Setting } from "../Setting";

interface Props {
	props_raw: RangePropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: RangeProps;
	props_schema: RangePropsSchema;
}

export class Range extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "range",
				default_value: 0,
				step: 1,
				min: 0,
				max: 100
			},

			props_schema: {
				default_value: {
					type: "integer"
				},
				step: {
					type: "integer",
					conditions: [
						{
							value: !!props_raw.step && props_raw.step > 0,
							message: __("This value has to be greater than 0.")
						},
						{
							value:
								!isUndefined(props_raw.max) &&
								!isUndefined(props_raw.min) &&
								!isUndefined(props_raw.step) &&
								props_raw.max - props_raw.min > props_raw.step,
							/* translators: %s: max property, %s: min property. */
							message: sprintf(
								__(
									"This value has to be greater than '%s' minus '%s' values."
								),
								"max",
								"min"
							)
						}
					]
				},
				min: {
					type: "integer"
				},
				max: {
					type: "integer",
					conditions: [
						{
							value:
								!isUndefined(props_raw.max) &&
								!isUndefined(props_raw.min) &&
								props_raw.max > props_raw.min,
							/* translators: %s: min property. */
							message: sprintf(
								__("This value has to be greater than '%s'."),
								"min"
							)
						}
					]
				}
			}
		});
	}
}
