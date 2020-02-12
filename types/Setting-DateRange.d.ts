type DateRangeProps = {
	type: "date_range";
	default_value: [string, string] | [];
	format: string;
	locale: string;
	unavailable_dates: [string, string][];
	minimum_days: number;
	maximum_days: number;
};

type DateRangePropsRaw = Partial<Omit<DateRangeProps, "type">>;

type DateRangePropsSchema = Record<
	keyof Omit<DateRangeProps, "type">,
	SchemaElement
>;
