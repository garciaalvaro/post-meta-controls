type ColorPaletteRaw = {
	[color_name: string]: string;
};

type ColorPalette = {
	name: string;
	color: string;
};

type ColorProps = {
	type: "color";
	default_value: string;
	alpha_control: boolean;
	palette: ColorPalette[];
};

type ColorPropsRaw = Partial<Omit<ColorProps, "type" | "palette">> & {
	palette?: ColorPalette[] | ColorPaletteRaw;
};

type ColorPropsSchema = Record<keyof Omit<ColorProps, "type">, SchemaElement>;
