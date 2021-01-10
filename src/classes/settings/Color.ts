import { isUndefined, reduce, isArray } from "lodash";

import { Setting } from "../Setting";

interface Props {
	props_raw: ColorPropsRaw &
		Omit<SettingPropsShared, "class_name" | "warnings">;
	props_defaults: ColorProps;
	props_schema: ColorPropsSchema;
}

export class Color extends Setting<Props> {
	constructor(props_raw: Props["props_raw"]) {
		super({
			props_raw,

			props_defaults: {
				type: "color",
				default_value: "",
				alpha_control: false,
				palette: [],
			},

			props_schema: {
				default_value: { type: "text" },
				alpha_control: { type: "boolean" },
				palette: { type: { _all: { name: "id", color: "text" } } },
			},
		});
	}

	beforeSetSchema = (props_raw: SettingProps): SettingProps => {
		props_raw = super.beforeSetSchema(props_raw);

		// @ts-ignore
		props_raw.palette = this.preparePalette(props_raw.palette);

		return props_raw;
	};

	preparePalette(palette: ColorPaletteRaw | ColorPalette[] | undefined) {
		if (isArray(palette) || isUndefined(palette)) {
			return palette;
		}

		return reduce<ColorPaletteRaw, ColorPalette[]>(
			palette,
			(acc, value, key) =>
				acc.concat({
					name: key,
					color: value,
				}),
			[]
		);
	}
}
