interface TextareaProps {
	type: "textarea";
	default_value: string;
	placeholder: string;
}

interface TextareaPropsRaw extends Partial<Omit<TextareaProps, "type">> {}

interface TextareaPropsSchema
	extends Record<keyof Omit<TextareaProps, "type">, SchemaElement> {}
