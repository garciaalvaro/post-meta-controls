type CheckboxMultipleProps = {
	type: "checkbox_multiple";
	default_value: string[];
	options: { value: string; label: string }[];
	use_toggle: boolean;
};

type CheckboxMultiplePropsRaw = Partial<Omit<CheckboxMultipleProps, "type">>;

type CheckboxMultiplePropsSchema = Record<
	keyof Omit<CheckboxMultipleProps, "type">,
	SchemaElement
>;
