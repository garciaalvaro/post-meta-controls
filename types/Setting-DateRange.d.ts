interface DateRangeProps {
	type: "date_range";
	default_value: string[];
	format: string;
	locale: string;
}

interface DateRangePropsRaw extends Partial<Omit<DateRangeProps, "type">> {}

interface DateRangePropsSchema
	extends Record<keyof Omit<DateRangeProps, "type">, SchemaElement> {}
