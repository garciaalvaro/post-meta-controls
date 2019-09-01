interface ImageMultipleProps {
	type: "image_multiple";
	default_value: number[];
}

interface ImageMultiplePropsRaw
	extends Partial<Omit<ImageMultipleProps, "type">> {}

interface ImageMultiplePropsSchema
	extends Record<keyof Omit<ImageMultipleProps, "type">, SchemaElement> {}
