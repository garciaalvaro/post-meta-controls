interface DateSingleProps {
	type: "date_single";
	default_value: string;
	format: string;
	locale: string;
}

interface DateSinglePropsRaw extends Partial<Omit<DateSingleProps, "type">> {}

interface DateSinglePropsSchema
	extends Record<keyof Omit<DateSingleProps, "type">, SchemaElement> {}
