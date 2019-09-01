interface RangeFloatProps {
	type: "range_float";
	default_value: number;
	step: number;
	min: number;
	max: number;
}

interface RangeFloatPropsRaw extends Partial<Omit<RangeFloatProps, "type">> {}

interface RangeFloatPropsSchema
	extends Record<keyof Omit<RangeFloatProps, "type">, SchemaElement> {}
