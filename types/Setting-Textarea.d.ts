type TextareaProps = {
	type: "textarea";
	default_value: string;
	placeholder: string;
};

type TextareaPropsRaw = Partial<Omit<TextareaProps, "type">>;

type TextareaPropsSchema = Record<
	keyof Omit<TextareaProps, "type">,
	SchemaElement
>;
