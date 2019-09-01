import { TextareaControl } from "@wordpress/components";

interface Props extends TextareaProps, SettingPropsShared {
	updateValue: (value: any) => void;
	value: TextareaProps["default_value"];
}

export const Textarea: React.ComponentType<Props> = props => {
	const { label, help, placeholder, value, updateValue } = props;

	return (
		<TextareaControl
			label={label}
			help={help}
			placeholder={placeholder}
			value={value}
			onChange={updateValue}
		/>
	);
};
