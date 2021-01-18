type TextProps = {
	type: "text";
	default_value: string;
	placeholder: string;
};

type TextPropsRaw = Partial<Omit<TextProps, "type">>;

type TextPropsSchema = Record<keyof Omit<TextProps, "type">, SchemaElement>;
