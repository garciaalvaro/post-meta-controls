interface CheckboxProps {
	type: "checkbox";
	default_value: boolean;
	input_label: string;
	use_toggle: boolean;
}

interface CheckboxPropsRaw extends Partial<Omit<CheckboxProps, "type">> {}

interface CheckboxPropsSchema
	extends Record<keyof Omit<CheckboxProps, "type">, SchemaElement> {}
