interface TextProps {
	type: "text";
	default_value: string;
	placeholder: string;
}

interface TextPropsRaw extends Partial<Omit<TextProps, "type">> {}

interface TextPropsSchema
	extends Record<keyof Omit<TextProps, "type">, SchemaElement> {}
