interface DateRangeProps {
	type: "date_range";
	default_value: [string, string] | [];
	format: string;
	locale: string;
	unavailable_dates: [string, string][];
}

interface DateRangePropsRaw extends Partial<Omit<DateRangeProps, "type">> {}

interface DateRangePropsSchema
	extends Record<keyof Omit<DateRangeProps, "type">, SchemaElement> {}
