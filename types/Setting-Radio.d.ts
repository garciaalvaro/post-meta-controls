type RadioOption = {
	value: string;
	label: string;
};

type RadioProps = {
	type: "radio";
	default_value: string;
	options: RadioOption[];
};

type RadioPropsRaw = Partial<Omit<RadioProps, "type">>;

type RadioPropsSchema = Record<keyof Omit<RadioProps, "type">, SchemaElement>;
