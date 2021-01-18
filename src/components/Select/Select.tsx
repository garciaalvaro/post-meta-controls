import React from "react";
import { SelectControl } from "@wordpress/components";

import "./Select.styl";

interface Props extends SelectProps, SettingPropsShared {
	updateValue: (value: string) => void;
	value: SelectProps["default_value"];
}

export const Select: React.ComponentType<Props> = props => {
	const { options, label, help, value, updateValue } = props;

	return (
		<SelectControl
			label={label}
			help={help}
			value={value}
			options={options}
			onChange={updateValue}
		/>
	);
};
