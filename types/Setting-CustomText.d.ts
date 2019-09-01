interface CustomTextProps {
	type: "custom_text";
	content: { type: string; content: string[]; href: string }[];
}

interface CustomTextPropsRaw extends Partial<Omit<CustomTextProps, "type">> {}

interface CustomTextPropsSchema
	extends Record<keyof Omit<CustomTextProps, "type">, SchemaElement> {}
