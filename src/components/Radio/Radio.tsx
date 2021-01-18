import React from "react";
import { RadioControl } from "@wordpress/components";

interface Props extends RadioProps, SettingPropsShared {
	updateValue: (value: string) => void;
	value: RadioProps["default_value"];
}

export const Radio: React.ComponentType<Props> = props => {
	const { options, label, help, value, updateValue } = props;

	return (
		<RadioControl
			label={label}
			help={help}
			selected={value}
			options={options}
			onChange={updateValue}
		/>
	);
};
