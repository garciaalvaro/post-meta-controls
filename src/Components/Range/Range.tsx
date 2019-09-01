import { RangeControl } from "@wordpress/components";

import "./Range.styl";

interface Props extends RangeProps, SettingPropsShared {
	updateValue: (value: any) => void;
	value: RangeProps["default_value"];
}

export const Range: React.ComponentType<Props> = props => {
	const { min, max, step, label, help, value, updateValue } = props;

	return (
		<RangeControl
			label={label}
			help={help}
			value={value}
			min={min}
			max={max}
			step={step}
			onChange={updateValue}
		/>
	);
};
