interface RadioOption {
	value: string;
	label: string;
}

interface RadioProps {
	type: "radio";
	default_value: string;
	options: RadioOption[];
}

interface RadioPropsRaw extends Partial<Omit<RadioProps, "type">> {}

interface RadioPropsSchema
	extends Record<keyof Omit<RadioProps, "type">, SchemaElement> {}
