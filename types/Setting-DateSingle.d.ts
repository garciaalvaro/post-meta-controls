type DateSingleProps = {
	type: "date_single";
	default_value: string;
	format: string;
	locale: string;
	unavailable_dates: [string, string][];
};

type DateSinglePropsRaw = Partial<Omit<DateSingleProps, "type">>;

type DateSinglePropsSchema = Record<
	keyof Omit<DateSingleProps, "type">,
	SchemaElement
>;
