import React from "react";
import {
	BaseControl,
	CheckboxControl,
	ToggleControl,
} from "@wordpress/components";

interface Props extends CheckboxProps, SettingPropsShared {
	updateValue: (value: boolean) => void;
	value: CheckboxProps["default_value"];
}

export const Checkbox: React.ComponentType<Props> = props => {
	const {
		id,
		input_label,
		label,
		help,
		value,
		use_toggle,
		updateValue,
	} = props;

	const toggleValue = () => updateValue(!value);

	return (
		<BaseControl id={id} label={label} help={help}>
			{use_toggle ? (
				<ToggleControl
					label={input_label}
					checked={value}
					onChange={toggleValue}
				/>
			) : (
				<CheckboxControl
					label={input_label}
					checked={value}
					onChange={toggleValue}
				/>
			)}
		</BaseControl>
	);
};
