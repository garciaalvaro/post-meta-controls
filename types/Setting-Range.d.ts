interface RangeProps {
	type: "range";
	default_value: number;
	step: number;
	min: number;
	max: number;
}

interface RangePropsRaw extends Partial<Omit<RangeProps, "type">> {}

interface RangePropsSchema
	extends Record<keyof Omit<RangeProps, "type">, SchemaElement> {}
