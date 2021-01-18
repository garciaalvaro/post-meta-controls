type ButtonsOption = {
	value: string;
	title: string;
	icon_dashicon: string;
	icon_svg: string;
};

type ButtonsProps = {
	type: "buttons";
	default_value: string;
	allow_empty: boolean;
	options: ButtonsOption[];
};

type ButtonsPropsRaw = Partial<Omit<ButtonsProps, "options">> & {
	options?: Partial<ButtonsOption>[];
};

type ButtonsPropsSchema = Record<
	keyof Omit<ButtonsProps, "type">,
	SchemaElement
>;
