type CheckboxProps = {
	type: "checkbox";
	default_value: boolean;
	input_label: string;
	use_toggle: boolean;
};

type CheckboxPropsRaw = Partial<Omit<CheckboxProps, "type">>;

type CheckboxPropsSchema = Record<
	keyof Omit<CheckboxProps, "type">,
	SchemaElement
>;
