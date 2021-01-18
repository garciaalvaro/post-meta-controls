type ImageMultipleProps = {
	type: "image_multiple";
	default_value: number[];
};

type ImageMultiplePropsRaw = Partial<Omit<ImageMultipleProps, "type">>;

type ImageMultiplePropsSchema = Record<
	keyof Omit<ImageMultipleProps, "type">,
	SchemaElement
>;
