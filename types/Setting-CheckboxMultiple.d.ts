interface CheckboxMultipleProps {
	type: "checkbox_multiple";
	default_value: string[];
	options: { value: string; label: string }[];
	use_toggle: boolean;
}

interface CheckboxMultiplePropsRaw
	extends Partial<Omit<CheckboxMultipleProps, "type">> {}

interface CheckboxMultiplePropsSchema
	extends Record<keyof Omit<CheckboxMultipleProps, "type">, SchemaElement> {}
