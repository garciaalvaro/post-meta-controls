type ImageProps = {
	type: "image";
	default_value: number;
};

type ImagePropsRaw = Partial<Omit<ImageProps, "type">>;

type ImagePropsSchema = Record<keyof Omit<ImageProps, "type">, SchemaElement>;
