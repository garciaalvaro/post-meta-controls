type SettingProps = SettingPropsShared & SettingPropsReceived;

type SettingPropsReceived =
	| ButtonsProps
	| CheckboxProps
	| CheckboxMultipleProps
	| ColorProps
	| CustomTextProps
	| DateRangeProps
	| DateSingleProps
	| ImageProps
	| ImageMultipleProps
	| RadioProps
	| RangeProps
	| RangeFloatProps
	| SelectProps
	| TextProps
	| TextareaProps;

type SettingPropsRawReceived = Partial<
	Omit<SettingPropsShared, "class_name" | "warnings">
> &
	(
		| ButtonsPropsRaw
		| CheckboxPropsRaw
		| CheckboxMultiplePropsRaw
		| ColorPropsRaw
		| CustomTextPropsRaw
		| DateRangePropsRaw
		| DateSinglePropsRaw
		| ImagePropsRaw
		| ImageMultiplePropsRaw
		| RadioPropsRaw
		| RangePropsRaw
		| RangeFloatPropsRaw
		| SelectPropsRaw
		| TextPropsRaw
		| TextareaPropsRaw
	);

type SettingPropsRaw = Partial<SettingPropsShared> &
	(
		| ButtonsPropsRaw
		| CheckboxPropsRaw
		| CheckboxMultiplePropsRaw
		| ColorPropsRaw
		| CustomTextPropsRaw
		| DateRangePropsRaw
		| DateSinglePropsRaw
		| ImagePropsRaw
		| ImageMultiplePropsRaw
		| RadioPropsRaw
		| RangePropsRaw
		| RangeFloatPropsRaw
		| SelectPropsRaw
		| TextPropsRaw
		| TextareaPropsRaw
	);

type SettingPropsShared = {
	class_name: "setting";
	warnings: Warning[];
	meta_key_exists: boolean;
	data_key_with_prefix: string;
	id: string;
	path: string[];
	label: string;
	help: string;
	data_type: "none" | "meta" | "localstorage";
	ui_border_top: boolean;
};

type SettingPropsPrivates = ("class_name" | "warnings")[];

type SettingPropsSchema = Record<keyof SettingProps, SchemaElement>;

type SettingPropsSchemaReceived =
	| ButtonsPropsSchema
	| CheckboxPropsSchema
	| CheckboxMultiplePropsSchema
	| ColorPropsSchema
	| CustomTextPropsSchema
	| DateRangePropsSchema
	| DateSinglePropsSchema
	| ImagePropsSchema
	| ImageMultiplePropsSchema
	| RadioPropsSchema
	| RangePropsSchema
	| RangeFloatPropsSchema
	| SelectPropsSchema
	| TextPropsSchema
	| TextareaPropsSchema;
