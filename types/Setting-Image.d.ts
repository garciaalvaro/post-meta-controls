interface ImageProps {
	type: "image";
	default_value: number;
}

interface ImagePropsRaw extends Partial<Omit<ImageProps, "type">> {}

interface ImagePropsSchema
	extends Record<keyof Omit<ImageProps, "type">, SchemaElement> {}
