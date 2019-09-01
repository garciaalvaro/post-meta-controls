interface ColorPaletteRaw {
	[color_name: string]: string;
}

interface ColorPalette {
	name: string;
	color: string;
}

interface ColorProps {
	type: "color";
	default_value: string;
	alpha_control: boolean;
	palette: ColorPalette[];
}

interface ColorPropsRaw extends Partial<Omit<ColorProps, "type" | "palette">> {
	palette?: ColorPalette[] | ColorPaletteRaw;
}

interface ColorPropsSchema
	extends Record<keyof Omit<ColorProps, "type">, SchemaElement> {}
