type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = {
	type: "select";
	default_value: string;
	options: SelectOption[];
};

type SelectPropsRaw = Partial<Omit<SelectProps, "type">>;

type SelectPropsSchema = Record<keyof Omit<SelectProps, "type">, SchemaElement>;
