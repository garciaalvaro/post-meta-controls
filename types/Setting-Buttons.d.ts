interface ButtonsOption {
	value: string;
	title: string;
	icon_dashicon: string;
	icon_svg: string;
}

interface ButtonsProps {
	type: "buttons";
	default_value: string;
	allow_empty: boolean;
	options: ButtonsOption[];
}

interface ButtonsPropsRaw
	extends Partial<Omit<ButtonsProps, "options" | "type">> {
	options?: Partial<ButtonsOption>[];
}

interface ButtonsPropsSchema
	extends Record<keyof Omit<ButtonsProps, "type">, SchemaElement> {}
