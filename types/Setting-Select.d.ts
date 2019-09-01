interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	type: "select";
	default_value: string;
	options: SelectOption[];
}

interface SelectPropsRaw extends Partial<Omit<SelectProps, "type">> {}

interface SelectPropsSchema
	extends Record<keyof Omit<SelectProps, "type">, SchemaElement> {}
