import { TextControl } from "@wordpress/components";

interface Props extends TextProps, SettingPropsShared {
	updateValue: (value: string) => void;
	value: TextProps["default_value"];
}

export const Text: React.ComponentType<Props> = props => {
	const { label, help, placeholder, value, updateValue } = props;

	return (
		<TextControl
			label={label}
			help={help}
			placeholder={placeholder}
			value={value}
			onChange={updateValue}
		/>
	);
};
