type RangeProps = {
	type: "range";
	default_value: number;
	step: number;
	min: number;
	max: number;
};

type RangePropsRaw = Partial<Omit<RangeProps, "type">>;

type RangePropsSchema = Record<keyof Omit<RangeProps, "type">, SchemaElement>;
