type CustomTextProps = {
	type: "custom_text";
	content: { type: string; content: string[]; href: string }[];
};

type CustomTextPropsRaw = Partial<Omit<CustomTextProps, "type">>;

type CustomTextPropsSchema = Record<
	keyof Omit<CustomTextProps, "type">,
	SchemaElement
>;
