type RangeFloatProps = {
	type: "range_float";
	default_value: number;
	step: number;
	min: number;
	max: number;
};

type RangeFloatPropsRaw = Partial<Omit<RangeFloatProps, "type">>;

type RangeFloatPropsSchema = Record<
	keyof Omit<RangeFloatProps, "type">,
	SchemaElement
>;
